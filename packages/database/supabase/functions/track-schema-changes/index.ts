import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      'http://host.docker.internal:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
      {
        auth: { persistSession: false }
      }
    )

    const { data: schemaInfo, error: schemaError } = await supabaseClient
      .rpc('get_schema_info')

    if (schemaError) throw schemaError

    // Get unique tables first
    const uniqueTables = [...new Set(schemaInfo.map(info => info.table_name))]
    console.log('Unique tables found:', uniqueTables)

    // Update allColumns
    const { data: existingColumns, error: existingError } = await supabaseClient
      .from('allColumns')
      .select('table_name, column_name')

    if (existingError) throw existingError

    const existingColumnSet = new Set(
      existingColumns?.map(col => `${col.table_name}.${col.column_name}`) || []
    )

    const newColumns = schemaInfo.filter(info =>
      !existingColumnSet.has(`${info.table_name}.${info.column_name}`)
    ).map(info => ({
      table_name: info.table_name,
      column_name: info.column_name,
      data_type: info.data_type
    }))

    // Update zeakColumnMeta
    const { data: existingZeakColumns, error: zeakError } = await supabaseClient
      .from('zeakColumnMeta')
      .select('columnName')

    if (zeakError) throw zeakError

    const existingZeakSet = new Set(
      existingZeakColumns?.map(col => col.columnName) || []
    )

    const newZeakColumns = schemaInfo
      .filter(info => !existingZeakSet.has(info.column_name))
      .map(info => {
        return {
          columnName: info.column_name,
          columnLabel: 'column lable',
          description: info.column_description,
          columnType: 'System',
          dataType: info.data_type,
          numberOfDecimals: info.numeric_precision,
          defaultValue: 'defaultValue',
          lengthRestriction: Boolean(info.character_maximum_length),
          nullable: info.is_nullable,
          uniqueValue: info.is_unique,
          calculatedField: false,
          dataValidation: false,
          display: true,
          toolTip: 'column toolTip',
          isInTableFilter: false,
          requiredField: false,
          formulaForCalculatedFields: 'formulaForCalculatedFields'
        }
      })

    // Update alltables
    const { data: existingTables, error: tablesError } = await supabaseClient
      .from('allTables')
      .select('tableName, schemaName')
      .is('deletedAt', null)

    if (tablesError) throw tablesError

    const existingTableSet = new Set(
      existingTables?.map(table => `${table.schemaname}.${table.tablename}`) || []
    )

    const newTables = uniqueTables
      .filter(tableName => !existingTableSet.has(`public.${tableName}`))
      .map(tableName => {
        const tableColumns = schemaInfo.filter(info => info.table_name === tableName)
        return {
          tableName: tableName,
          schemaName: 'public',
          module: null,
          nullable: true,
          includeInTenantSchema: false,
          isTenantSpecific: false,
          containsPii: false,
          encryptionRequired: false,
          tableType: 'System',
          createdBy: '00000000-0000-0000-0000-000000000000',
          foreignKeys: JSON.stringify(
            tableColumns
              .filter(col => col.data_type.includes('foreign'))
              .map(col => ({
                column: col.column_name,
                references: null
              }))
          )
        }
      })

    // Perform inserts with detailed error logging
    if (newColumns.length > 0) {
      const { error: columnsError } = await supabaseClient
        .from('allColumns')
        .insert(newColumns)
      if (columnsError) {
        console.error('Error inserting allColumns:', columnsError)
        throw columnsError
      }
    }



    if (newTables.length > 0) {
      const { error: allTablesError } = await supabaseClient
        .from('allTables')
        .insert(newTables)
      if (allTablesError) {
        console.error('Error inserting allTables:', allTablesError)
        throw allTablesError
      }
    }

    if (newZeakColumns.length > 0 || true) {
      console.log('Inserting zeakColumnMeta records:', newZeakColumns[0]) // Log first record for debugging
      const { error: zeakColumnsError } = await supabaseClient
        .from('zeakColumnMeta')
        .insert(newZeakColumns)
      if (zeakColumnsError) {
        console.error('Error inserting zeakColumnMeta:', zeakColumnsError)
        throw zeakColumnsError
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Schema check complete',
        new_columns: newColumns,
        new_tables: newTables,
        new_zeak_columns: newZeakColumns
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})