// app/utils/kafka.client.ts

// Types
interface KafkaMessage {
  topic: string
  message: any
  isConsumer?: boolean,
  key?: string
  headers?: Record<string, string>
}

export interface NotificationMessage {
  type: 'email' | 'push' | 'in-app'
  title: string
  message: string
  priority?: 'high' | 'normal' | 'low'
}

export interface AnalyticsEvent {
  eventName: string
  category: string
  userId?: string
  properties: Record<string, any>
}

export interface BackgroundJob {
  jobType: string
  payload: any
  options: {
    priority?: 'high' | 'normal' | 'low'
    scheduledFor?: string
    retryCount?: number
  }
}

interface KafkaConsumerConfig {
  groupId: string;
  topics: string[];
}

// Function to initialize Kafka consumer
async function initializeKafkaConsumer(config: KafkaConsumerConfig) {
  const response = await fetch('/api/kafka', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // You can pass configuration as URL parameters
    // body: JSON.stringify(config)
  });

  if (!response.ok) {
    throw new Error('Failed to initialize Kafka consumer');
  }

  return response.json();
}

// Base Kafka publish function
async function publishToKafka(message: KafkaMessage) {
  const response = await fetch('/api/kafka', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  })

  if (!response.ok) {
    throw new Error('Failed to publish message')
  }

  return response.json()
}

// Example usage
export async function setupKafkaConsumer() {
  try {
    const config: KafkaConsumerConfig = {
      groupId: 'my-consumer-group',
      topics: ['notifications', 'user-activities', 'analytics-events']
    };

    const result = await initializeKafkaConsumer(config);
    console.log('Kafka consumer initialized:', result);
    return result;
  } catch (error) {
    console.error('Failed to initialize Kafka consumer:', error);
    throw error;
  }
}

// User Activity Tracking
export async function trackUserActivity(
  userId: string,
  action: string,
  metadata: Record<string, any> = {}
) {
  return publishToKafka({
    topic: 'user-activities',
    key: userId,
    message: {
      userId,
      action,
      metadata,
      timestamp: new Date().toISOString()
    }
  })
}

// Notification Sending
export async function sendNotification(
  userId: string,
  notification: NotificationMessage
) {
  return publishToKafka({
    topic: 'notifications',
    key: userId,
    message: {
      userId,
      ...notification,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
  })
}

// Analytics Event Tracking
export async function trackAnalyticsEvent(event: AnalyticsEvent) {
  return publishToKafka({
    topic: 'analytics-events',
    key: event.userId || 'anonymous',
    message: {
      ...event,
      timestamp: new Date().toISOString()
    }
  })
}

// Data Sync
export async function syncData(
  entityType: string,
  action: 'create' | 'update' | 'delete',
  data: Record<string, any>
) {
  return publishToKafka({
    topic: 'data-sync',
    key: `${entityType}-${data.id}`,
    message: {
      entityType,
      action,
      data,
      timestamp: new Date().toISOString()
    }
  })
}

// Background Job Queue
export async function queueBackgroundJob(
  jobType: string,
  payload: Record<string, any>,
  options: BackgroundJob['options'] = {}
) {
  return publishToKafka({
    topic: 'background-jobs',
    key: jobType,
    message: {
      jobType,
      payload,
      options,
      status: 'queued',
      queuedAt: new Date().toISOString()
    }
  })
}

// Error Reporting
export async function reportError(
  error: Error,
  context: Record<string, any> = {}
) {
  return publishToKafka({
    topic: 'error-reports',
    message: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    }
  })
}

// Audit Logging
export async function logAuditEvent(
  userId: string,
  action: string,
  details: Record<string, any>
) {
  return publishToKafka({
    topic: 'audit-logs',
    key: userId,
    message: {
      userId,
      action,
      details,
      timestamp: new Date().toISOString(),
      userAgent: window.navigator.userAgent
    }
  })
}

// Cache Invalidation
export async function invalidateCache(
  cacheKey: string,
  reason: string
) {
  return publishToKafka({
    topic: 'cache-invalidation',
    key: cacheKey,
    message: {
      cacheKey,
      reason,
      timestamp: new Date().toISOString()
    }
  })
}

// Metric Collection
export async function recordMetric(
  metricName: string,
  value: number,
  tags: Record<string, string> = {}
) {
  return publishToKafka({
    topic: 'metrics',
    key: metricName,
    message: {
      name: metricName,
      value,
      tags,
      timestamp: new Date().toISOString()
    }
  })
}

// User Feedback
export async function submitFeedback(
  userId: string,
  feedbackType: 'bug' | 'feature' | 'general',
  content: string,
  metadata: Record<string, any> = {}
) {
  return publishToKafka({
    topic: 'user-feedback',
    key: userId,
    message: {
      userId,
      type: feedbackType,
      content,
      metadata,
      timestamp: new Date().toISOString()
    }
  })
}

