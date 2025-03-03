import { Database } from "@zeak/labels-forms";
import { getSupabaseServiceRole } from "~/lib/supabase";


const supabase = getSupabaseServiceRole()


// Rules CRUD
export async function createRule(ruleData: Partial<Database['public']['Tables']['rulesTable']['Insert']>) {
  const { data, error } = await supabase
    .from('rulesTable')
    .insert(ruleData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRuleById(ruleId: string) {
  const { data, error } = await supabase
    .from('rulesTable')
    .select(`
      *,
      ruleCategories!inner(*),
      ruleTags(*)
    `)
    .eq('ruleId', ruleId)
    .single();

  if (error) throw error;
  return data;
}

export async function getAllRules() {
  const { data, error } = await supabase
    .from('rulesTable')
    .select(`
      *,
      ruleCategories(*),
      ruleTags(*)
    `)
    .order('createdAt', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getRulesByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('rulesTable')
    .select(`
      *,
      ruleCategories!inner(*),
      ruleTags(*)
    `)
    .eq('categoryId', categoryId);

  if (error) throw error;
  return data;
}

export async function updateRule(ruleId: string, ruleData: Partial<Database['public']['Tables']['rulesTable']['Update']>) {
  const { data, error } = await supabase
    .from('rulesTable')
    .update(ruleData)
    .eq('ruleId', ruleId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteRule(ruleId: string) {
  const { error } = await supabase
    .from('rulesTable')
    .delete()
    .eq('ruleId', ruleId);

  if (error) throw error;
  return true;
}

// Categories CRUD
export async function createCategory(categoryData: Partial<Database['public']['Tables']['ruleCategories']['Insert']>) {
  const { data, error } = await supabase
    .from('ruleCategories')
    .insert(categoryData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('ruleCategories')
    .select(`
      *,
      rulesTable(count)
    `)
    .order('categoryName');

  if (error) throw error;
  return data;
}

export async function updateCategory(categoryId: string, categoryData: Partial<Database['public']['Tables']['ruleCategories']['Update']>) {
  const { data, error } = await supabase
    .from('ruleCategories')
    .update(categoryData)
    .eq('categoryId', categoryId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCategory(categoryId: string) {
  const { error } = await supabase
    .from('ruleCategories')
    .delete()
    .eq('categoryId', categoryId);

  if (error) throw error;
  return true;
}

// Tags CRUD
export async function createTag(tagData: Partial<Database['public']['Tables']['ruleTags']['Insert']>) {
  const { data, error } = await supabase
    .from('ruleTags')
    .insert(tagData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllTags() {
  const { data, error } = await supabase
    .from('ruleTags')
    .select('*')
    .order('tagName');

  if (error) throw error;
  return data;
}

export async function updateTag(tagId: string, tagData: Partial<Database['public']['Tables']['ruleTags']['Update']>) {
  const { data, error } = await supabase
    .from('ruleTags')
    .update(tagData)
    .eq('tagId', tagId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTag(tagId: string) {
  const { error } = await supabase
    .from('ruleTags')
    .delete()
    .eq('tagId', tagId);

  if (error) throw error;
  return true;
}

// Tag Relations
export async function addTagToRule(ruleId: string, tagId: string) {
  const { data, error } = await supabase
    .from('ruleTagRelations')
    .insert({ ruleId, tagId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeTagFromRule(ruleId: string, tagId: string) {
  const { error } = await supabase
    .from('ruleTagRelations')
    .delete()
    .match({ ruleId, tagId });

  if (error) throw error;
  return true;
}

export async function getRulesByTag(tagId: string) {
  const { data, error } = await supabase
    .from('rulesTable')
    .select(`
      *,
      ruleCategories(*),
      ruleTags!inner(*)
    `)
    .eq('ruleTags.tagId', tagId);

  if (error) throw error;
  return data;
}

// Templates CRUD
export async function createTemplate(templateData: Partial<Database['public']['Tables']['ruleTemplates']['Insert']>) {
  const { data, error } = await supabase
    .from('ruleTemplates')
    .insert(templateData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllTemplates() {
  const { data, error } = await supabase
    .from('ruleTemplates')
    .select(`
      *,
      ruleCategories(*)
    `)
    .order('templateName');

  if (error) throw error;
  return data;
}

export async function getTemplateById(templateId: string) {
  const { data, error } = await supabase
    .from('ruleTemplates')
    .select(`
      *,
      ruleCategories(*)
    `)
    .eq('templateId', templateId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateTemplate(templateId: string, templateData: Partial<Database['public']['Tables']['ruleTemplates']['Update']>) {
  const { data, error } = await supabase
    .from('ruleTemplates')
    .update(templateData)
    .eq('templateId', templateId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTemplate(templateId: string) {
  const { error } = await supabase
    .from('ruleTemplates')
    .delete()
    .eq('templateId', templateId);

  if (error) throw error;
  return true;
}

// Rule Execution Logs
export async function createExecutionLog(logData: Partial<Database['public']['Tables']['ruleExecutionLogs']['Insert']>) {
  const { data, error } = await supabase
    .from('ruleExecutionLogs')
    .insert(logData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getExecutionLogs(ruleId?: string) {
  const query = supabase
    .from('ruleExecutionLogs')
    .select(`
      *,
      rulesTable(ruleName)
    `)
    .order('executedAt', { ascending: false });

  if (ruleId) {
    query.eq('ruleId', ruleId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

// Advanced Queries
export async function getActiveRules() {
  const { data, error } = await supabase
    .from('rulesTable')
    .select(`
      *,
      ruleCategories(*),
      ruleTags(*)
    `)
    .eq('isActive', true)
    .order('rulePriority', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getRulesByScope(scope: 'global' | 'local') {
  const { data, error } = await supabase
    .from('rulesTable')
    .select(`
      *,
      ruleCategories(*),
      ruleTags(*)
    `)
    .eq('ruleScope', scope);

  if (error) throw error;
  return data;
}