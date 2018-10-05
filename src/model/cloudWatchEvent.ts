export interface CloudWatchEvent {
  name: string,
  arn: string,
  state: string,
  description: string,
  scheduleExpression: string
}