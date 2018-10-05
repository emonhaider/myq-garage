import * as AWS from 'aws-sdk';
import { CloudWatchEvent } from '../model/cloudWatchEvent';

AWS.config.update({
  region: 'us-east-1'
});
AWS.config.setPromisesDependency(null);

export class CloudWatchEventService {
  private cloudwatchevents = new AWS.CloudWatchEvents();
  async getEvents(name?: string): Promise<Array<CloudWatchEvent>> {
    var params: any = {
      Limit: 10
    };
    if (name) {
      params.NamePrefix = name;
    }
    const data: any = await this.cloudwatchevents.listRules(params).promise();
    return <Array<CloudWatchEvent>>data.Rules;
  }
}