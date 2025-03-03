import { Kafka, logLevel } from 'kafkajs'
import type { Producer, Consumer } from 'kafkajs'
import type { KafkaMessage } from '~/types/kafka.types'
import dotenv from 'dotenv'

dotenv.config()
// Connection retry configuration
const RETRY_CONFIG = {
  initialRetryTime: 1000, // 1 second
  maxRetryTime: 30000,    // 30 seconds
  retries: 10
}

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: (process.env.KAFKA_BROKERS || '').split(','),
  ssl: process.env.KAFKA_SSL === 'true',
  sasl: process.env.KAFKA_SASL === 'true' ? {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME || '',
    password: process.env.KAFKA_PASSWORD || ''
  } : undefined,
  // retry: RETRY_CONFIG,
  // logLevel: logLevel.ERROR
})

class KafkaService {
  private producer: Producer | null = null
  private consumers: Map<string, Consumer> = new Map()

  async getProducer(): Promise<Producer> {
    if (!this.producer) {
      this.producer = kafka.producer()
      await this.producer.connect()
    }
    return this.producer
  }

  async publishMessage(message: KafkaMessage): Promise<void> {
    const producer = await this.getProducer()
    await producer.send({
      topic: message.topic,
      messages: [{
        key: message.key,
        value: JSON.stringify(message.value),
        headers: message.headers
      }]
    })
  }

  async setupConsumer(
    groupId: string,
    topics: string[],
    handler: (message: KafkaMessage) => Promise<void>
  ): Promise<void> {
    const consumer = kafka.consumer({ groupId })
    await consumer.connect()
    await consumer.subscribe({ topics, fromBeginning: false })

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        await handler({
          topic,
          key: message.key?.toString(),
          value: message.value ? JSON.parse(message.value.toString()) : null,
          headers: message.headers as Record<string, string>
        })
      }
    })

    this.consumers.set(groupId, consumer)
  }

  async shutdown(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect()
      this.producer = null
    }

    for (const consumer of this.consumers.values()) {
      await consumer.disconnect()
    }
    this.consumers.clear()
  }
}

export const kafkaService = new KafkaService()
