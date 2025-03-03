import { json } from '@remix-run/node'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { kafkaService } from '~/services/kafka.server'
import type { KafkaMessage } from '~/types/kafka.types'


// Track if consumer is already initialized to avoid duplicate setups
let consumerInitialized = false

async function messageHandler(message: KafkaMessage) {
  console.log('Received message:', {
    topic: message.topic,
    key: message.key,
    value: message.value,
    headers: message.headers
  })
  // Add your message processing logic here
}

// Updated loader function to accept configuration
export const loader: LoaderFunction = async ({ request }) => {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    // Get configuration from request body
    const config = {
      groupId: 'my-consumer-group',
      topics: ['notifications', 'user-activities', 'analytics-events']
    };

    if (!consumerInitialized) {
      await kafkaService.setupConsumer(
        config.groupId,
        config.topics,
        messageHandler
      )
      consumerInitialized = true
      console.log('Kafka consumer initialized successfully')
    }

    return json({
      initialized: true,
      groupId: config.groupId,
      topics: config.topics
    })
  } catch (error) {
    console.error('Failed to initialize Kafka consumer:', error)
    return json({ error: 'Failed to initialize Kafka consumer' }, { status: 500 })
  }
}


export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const data = await request.json()
    await kafkaService.publishMessage({
      topic: data.topic,
      value: data.message,
      key: data.key,
      headers: data.headers
    })

    return json({ success: true })
  } catch (error) {
    console.error('Kafka publish error:', error)
    return json({ error: 'Failed to publish message' }, { status: 500 })
  }
}
