-- Integration Seed Data
-- This file can be run independently to seed integration data
-- Run with: psql -U postgres -d your_database_name -f integration_seed.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Copy the entire content from seed.sql
-- Seed data for integrations
-- This file contains seed data for the integrations tables

-- do replace the createdBy with the actual user id
-- also replace the golden with the actual tenant id
-- relace the id in the companyIds with the actual company ids

-- Insert into integrationsMaster
INSERT INTO "572cf367-22bd-44d0-916f-ee98b6d94309"."integrationsMaster" (
    "id", 
    "integrationName", 
    "applicationName",
    "integrationCode", 
    "logo", 
    "description", 
    "isFavorite",
    "integrationType", 
    "connectionType", 
    "authType",
    "connectionLimit", 
    "copies", 
    "integrationCategory",
    "status", 
    "companyIds", 
    "tags", 
    "isTested", 
    "createdBy", 
    "syncToken"
) VALUES 
-- Microsoft Dynamics 365
(
    '00000000-0000-0000-0000-000000000001', 
    'Microsoft Dynamics 365', 
    'Microsoft Dynamics 365',
    'MS-DYN-365', 
    'https://www.solzit.com/wp-content/uploads/2024/09/Microsoft-Dynamics-365-logo.png', 
    'Enterprise resource planning (ERP) and customer relationship management (CRM) applications',
    TRUE, 
    'System', 
    'API', 
    'OAuth2',
    5, 
    0, 
    'ERP',
    'Active', 
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[], -- Replace with actual company IDs
    '["ERP", "CRM", "Microsoft"]', 
    TRUE, 
    'System', 
    uuid_generate_v4()
),
-- Office 365
(
    '00000000-0000-0000-0000-000000000002', 
    'Office 365', 
    'Office 365',
    'MS-O365', 
    'https://play-lh.googleusercontent.com/Cf6rGlvAZJx2iG4c5f5H5N5XWGKFk5XZ_uz0A0YIIyuFPFybIfQaxSlDIQyU2W8btfv6=w240-h480-rw', 
    'Productivity suite including email, document editing, and collaboration tools', 
    TRUE, 
    'System', 
    'API', 
    'OAuth2',
    3, 
    0, 
    'Productivity',
    'Active', 
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[], -- Replace with actual company IDs
    '["Productivity", "Microsoft", "Email", "Documents"]', 
    TRUE, 
    'System', 
    uuid_generate_v4()
),
-- Azure DevOps
(
    '00000000-0000-0000-0000-000000000003', 
    'Azure DevOps', 
    'Azure DevOps',
    'AZURE-DEVOPS', 
    'https://www.powerbisentinel.com/wp-content/uploads/slider61/vsonline_215-300x234-1.png', 
    'Development collaboration tools including Git repositories, CI/CD pipelines, and agile boards', 
    FALSE, 
    'System', 
    'REST', 
    'API Key',
    3, 
    0, 
    'Project Management',
    'Inactive', 
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[], -- Replace with actual company IDs
    '["DevOps", "Microsoft", "CI/CD"]', 
    FALSE, 
    'System', 
    uuid_generate_v4()
),
-- Salesforce
(
    '00000000-0000-0000-0000-000000000004', 
    'Salesforce', 
    'Salesforce',
    'SF-CRM', 
    'https://w7.pngwing.com/pngs/738/117/png-transparent-salesforce-com-cloud-computing-salesforce-marketing-cloud-sales-engineer-blue-text-logo-thumbnail.png', 
    'Customer relationship management (CRM) platform for sales, service, marketing, and more', 
    TRUE, 
    'System', 
    'API', 
    'PAT',
    4, 
    0, 
    'CRM',
    'Active', 
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[], -- Replace with actual company IDs
    '["CRM", "Sales", "Marketing"]', 
    TRUE, 
    'System', 
    uuid_generate_v4()
),
-- Slack
(
    '00000000-0000-0000-0000-000000000005', 
    'Slack', 
    'Slack',
    'SLACK', 
    'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/306_Slack_logo-512.png', 
    'Business communication platform offering many IRC-style features', 
    FALSE, 
    'System', 
    'REST', 
    'OAuth2',
    2, 
    0, 
    'Communication',
    'Inactive', 
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[], -- Replace with actual company IDs
    '["Communication", "Messaging", "Collaboration"]', 
    FALSE, 
    'System', 
    uuid_generate_v4()
);

-- Insert into integrationConnections
INSERT INTO "572cf367-22bd-44d0-916f-ee98b6d94309"."integrationConnections" (
    "id",
    "integrationId",
    "connectionName",
    "connectionCode",
    "connectionDescription",
    "companyIds",
    "isEnabled",
    "connectionDetails",
    "executionFrequency",
    "connectionStatus",
    "isTested",
    "createdBy",
    "syncToken"
) VALUES
-- Microsoft Dynamics 365 - Prod
(
    'c1000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Dynamics 365 - Production',
    'DYN365-PROD',
    'ERP Production environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    TRUE,
    '{"environmentType": "PROD", "environmentURL": "https://api.dynamics.com/prod", "maxRetries": 3, "timeout": 30, "retryDelay": 5}'::json,
    'Scheduled',
    'Online',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Microsoft Dynamics 365 - Dev
(
    'c2000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Dynamics 365 - Development',
    'DYN365-DEV',
    'Feature Development environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    FALSE,
    '{"environmentType": "DEV", "environmentURL": "https://api.dynamics.com/dev", "maxRetries": 5, "timeout": 60, "retryDelay": 10}'::json,
    'On-Demand',
    'Online',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Office 365 - Prod
(
    'c1000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'Office 365 - Production',
    'O365-PROD',
    'Office Production environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    TRUE,
    '{"environmentType": "PROD", "environmentURL": "https://graph.microsoft.com/v1.0", "maxRetries": 3, "timeout": 30, "retryDelay": 5}'::json,
    'Scheduled',
    'Online',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Office 365 - Dev
(
    'c2000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'Office 365 - Development',
    'O365-DEV',
    'Office 365 Development environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    FALSE,
    '{"environmentType": "DEV", "environmentURL": "https://graph.microsoft.com/beta", "maxRetries": 5, "timeout": 60, "retryDelay": 10}'::json,
    'On-Demand',
    'Online',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Azure DevOps - Prod
(
    'c1000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'Azure DevOps - Production',
    'AZDO-PROD',
    'Azure Production environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    TRUE,
    '{"environmentType": "PROD", "environmentURL": "https://dev.azure.com/prod", "maxRetries": 2, "timeout": 45, "retryDelay": 3}'::json,
    'On-Demand',
    'Online',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Azure DevOps - Dev
(
    'c2000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'Azure DevOps - Development',
    'AZDO-DEV',
    'Azure Development environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    FALSE,
    '{"environmentType": "DEV", "environmentURL": "https://dev.azure.com/dev", "maxRetries": 4, "timeout": 60, "retryDelay": 8}'::json,
    'Scheduled',
    'Error',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce - Prod
(
    'c1000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000004',
    'Salesforce - Production',
    'SF-PROD',
    'Salesforce Production environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    TRUE,
    '{"environmentType": "PROD", "environmentURL": "https://api.salesforce.com/prod", "maxRetries": 3, "timeout": 30, "retryDelay": 5}'::json,
    'Batch',
    'Offline',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce - Dev
(
    'c2000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000004',
    'Salesforce - Development',
    'SF-DEV',
    'Salesforce Development environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    FALSE,
    '{"environmentType": "DEV", "environmentURL": "https://api.salesforce.com/dev", "maxRetries": 5, "timeout": 45, "retryDelay": 7}'::json,
    'On-Demand',
    'Error',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce - Testing
(
    'c3000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000004',
    'Salesforce - Testing',
    'SF-TEST',
    'Salesforce Testing environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    FALSE,
    '{"environmentType": "TEST", "environmentURL": "https://api.salesforce.com/test", "maxRetries": 4, "timeout": 40, "retryDelay": 6}'::json,
    'Scheduled',
    'Offline',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Slack - Prod
(
    'c1000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000005',
    'Slack - Production',
    'SLACK-PROD',
    'Slack Production environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    TRUE,
    '{"environmentType": "PROD", "environmentURL": "https://slack.com/api", "maxRetries": 3, "timeout": 20, "retryDelay": 4}'::json,
    'Batch',
    'Online',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Slack - Dev
(
    'c2000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000005',
    'Slack - Development',
    'SLACK-DEV',
    'Slack Development environment',
    ARRAY['572cf367-22bd-44d0-916f-ee98b6d94309']::UUID[],
    FALSE,
    '{"environmentType": "DEV", "environmentURL": "https://slack.com/api/dev", "maxRetries": 5, "timeout": 30, "retryDelay": 6}'::json,
    'On-Demand',
    'Error',
    TRUE,
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
);

-- Insert into integrationCreds
INSERT INTO "572cf367-22bd-44d0-916f-ee98b6d94309"."integrationCreds" (
    "id",
    "integrationId",
    "credentials",
    "encryptionAlgorithm",
    "credentialStatus",
    "validFrom",
    "validTo",
    "issuer",
    "scopes",
    "createdBy",
    "syncToken"
) VALUES
-- Microsoft Dynamics 365 credentials
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000001',
    '{"clientId": "encrypted-client-id-here", "clientSecret": "encrypted-client-secret-here", "tenantId": "tenant-id-here"}',
    'AES',
    'Active',
    '2024-01-01 00:00:00+00',
    '2025-01-01 00:00:00+00',
    'Microsoft Dynamics 365',
    '["Contacts.Read", "Accounts.ReadWrite"]',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Office 365 credentials
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000002',
    '{"clientId": "encrypted-client-id-here", "clientSecret": "encrypted-client-secret-here", "tenantId": "tenant-id-here"}',
    'AES',
    'Active',
    '2024-01-01 00:00:00+00',
    '2025-01-01 00:00:00+00',
    'Office 365',
    '["Mail.Read", "Calendars.ReadWrite"]',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Azure DevOps credentials
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000003',
    '{"personalAccessToken": "encrypted-pat-here", "organization": "your-org"}',
    'AES',
    'Active',
    '2024-01-01 00:00:00+00',
    '2025-01-01 00:00:00+00',
    'Azure DevOps',
    '["Code.Read", "WorkItems.ReadWrite"]',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce credentials
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000004',
    '{"clientId": "encrypted-client-id-here", "clientSecret": "encrypted-client-secret-here", "instanceUrl": "https://yourinstance.salesforce.com"}',
    'AES',
    'Active',
    '2024-01-01 00:00:00+00',
    '2025-01-01 00:00:00+00',
    'Salesforce',
    '["api", "web", "full"]',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Slack credentials
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000005',
    '{"apiKey": "encrypted-api-key-here", "webhookUrl": "https://hooks.slack.com/services/example"}',
    'AES',
    'Active',
    '2024-01-01 00:00:00+00',
    '2025-01-01 00:00:00+00',
    'Slack',
    '["chat:write", "channels:read"]',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
);

-- Insert into integrationParameters
INSERT INTO "572cf367-22bd-44d0-916f-ee98b6d94309"."integrationParameters" (
    "id",
    "integrationId",
    "parameterName",
    "parameterValue",
    "valueType",
    "isSensitive",
    "parameterStatus",
    "companyId",
    "createdBy",
    "syncToken"
) VALUES
-- Microsoft Dynamics 365 - Client ID
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000001',
    'CLIENT_ID',
    'dynamics365-client-id',
    'String',
    FALSE,
    'Active',
    '{"companyId": "1", "companyName": "Acme Corp"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Microsoft Dynamics 365 - Client Secret
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000001',
    'CLIENT_SECRET',
    'encrypted-secret-here',
    'String',
    TRUE,
    'Active',
    '{"companyId": "1", "companyName": "Acme Corp"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Office 365 - Client ID
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000002',
    'CLIENT_ID',
    'office365-client-id',
    'String',
    FALSE,
    'Active',
    '{"companyId": "1", "companyName": "Acme Corp"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Office 365 - Client Secret
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000002',
    'CLIENT_SECRET',
    'encrypted-secret-here',
    'String',
    TRUE,
    'Active',
    '{"companyId": "1", "companyName": "Acme Corp"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Azure DevOps - API Key
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000003',
    'API_KEY',
    'encrypted-api-key-here',
    'String',
    TRUE,
    'Active',
    '{"companyId": "1", "companyName": "Acme Corp"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce - API Key
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000004',
    'API_KEY',
    'encrypted-api-key-here',
    'String',
    TRUE,
    'Active',
    '{"companyId": "1", "companyName": "Acme Corp"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Slack - API Key
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000005',
    'API_KEY',
    'encrypted-api-key-here',
    'String',
    TRUE,
    'Active',
    '{"companyId": "1", "companyName": "Acme Corp"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
);

-- Insert sample integration logs
INSERT INTO "572cf367-22bd-44d0-916f-ee98b6d94309"."integrationLogs" (
    "id",
    "referenceId",
    "referenceType",
    "eventType",
    "eventTime",
    "responseCode",
    "requestPayload",
    "responsePayload",
    "initiatedBy",
    "details",
    "eventStatus",
    "createdBy",
    "syncToken"
) VALUES
-- Microsoft Dynamics 365 connection log
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000001',
    'integration',
    'connected',
    NOW() - INTERVAL '1 day',
    200,
    '{"action": "connect", "params": {"environment": "prod"}}',
    '{"status": "success", "message": "Connected successfully"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Successfully connected to Microsoft Dynamics 365',
    'success',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Office 365 connection log
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000002',
    'integration',
    'connected',
    NOW() - INTERVAL '2 days',
    200,
    '{"action": "connect", "params": {"environment": "prod"}}',
    '{"status": "success", "message": "Connected successfully"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Successfully connected to Office 365',
    'success',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Azure DevOps error log
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000003',
    'integration',
    'error',
    NOW() - INTERVAL '3 days',
    401,
    '{"action": "connect", "params": {"environment": "prod"}}',
    '{"status": "error", "message": "Authentication failed"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Failed to connect to Azure DevOps due to authentication error',
    'failure',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce connection log
(
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000004',
    'integration',
    'connected',
    NOW() - INTERVAL '4 days',
    200,
    '{"action": "connect", "params": {"environment": "prod"}}',
    '{"status": "success", "message": "Connected successfully"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Successfully connected to Salesforce',
    'success',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Dynamics 365 Production connection log - sync
(
    uuid_generate_v4(),
    'c1000000-0000-0000-0000-000000000001',
    'connection',
    'connected',
    NOW() - INTERVAL '5 days',
    200,
    '{"action": "sync", "params": {"entity": "customers"}}',
    '{"status": "success", "message": "Synced 150 records"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Successfully synced customer data from Dynamics 365 Production',
    'success',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Dynamics 365 Development connection log - error
(
    uuid_generate_v4(),
    'c2000000-0000-0000-0000-000000000001',
    'connection',
    'error',
    NOW() - INTERVAL '2 days',
    500,
    '{"action": "sync", "params": {"entity": "products"}}',
    '{"status": "error", "message": "Internal server error", "details": "Timeout occurred while processing request"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Failed to sync product data from Dynamics 365 Development due to server timeout',
    'failure',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Office 365 Production connection log - retry
(
    uuid_generate_v4(),
    'c1000000-0000-0000-0000-000000000002',
    'connection',
    'retry',
    NOW() - INTERVAL '3 days',
    429,
    '{"action": "fetch", "params": {"entity": "emails", "limit": 1000}}',
    '{"status": "error", "message": "Too many requests", "retryAfter": 60}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Rate limit exceeded while fetching emails from Office 365 Production, retry scheduled',
    'failure',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Azure DevOps Production connection log - successful operation
(
    uuid_generate_v4(),
    'c1000000-0000-0000-0000-000000000003',
    'connection',
    'connected',
    NOW() - INTERVAL '1 day',
    200,
    '{"action": "fetch", "params": {"entity": "workitems", "project": "ZEAK"}}',
    '{"status": "success", "message": "Retrieved 75 work items", "data": {"count": 75}}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Successfully retrieved work items from Azure DevOps Production',
    'success',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce Production connection log - disconnection
(
    uuid_generate_v4(),
    'c3000000-0000-0000-0000-000000000004',
    'connection',
    'disconnected',
    NOW() - INTERVAL '12 hours',
    200,
    '{"action": "disconnect", "params": {"reason": "scheduled"}}',
    '{"status": "success", "message": "Disconnected successfully"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Scheduled disconnection from Salesforce Production completed successfully',
    'success',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
),
-- Salesforce Production connection log - reconnection
(
    uuid_generate_v4(),
    'c3000000-0000-0000-0000-000000000004',
    'connection',
    'connected',
    NOW() - INTERVAL '6 hours',
    200,
    '{"action": "connect", "params": {"reason": "scheduled"}}',
    '{"status": "success", "message": "Connected successfully"}',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    'Scheduled reconnection to Salesforce Production completed successfully',
    'success',
    '8c86884c-050e-4cc3-a5e8-4ec02c5f945b',
    uuid_generate_v4()
); 