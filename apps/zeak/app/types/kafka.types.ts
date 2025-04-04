export interface KafkaMessage {
  topic: string
  value: unknown
  key?: string
  headers?: Record<string, string>
}