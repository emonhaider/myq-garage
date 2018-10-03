import { GarageMonitorService } from "./service/garageMonitorService";
import { MyQService } from "./service/myQService";
import { Handler, Context, Callback } from 'aws-lambda';
import * as MyQApi from 'myq-api';

if (!process.env.MY_Q_USERNAME && !process.env.MY_Q_PWD) {
  throw new Error('myq username or password not provided');
}
const myQAccount = new MyQApi(process.env.MY_Q_USERNAME, process.env.MY_Q_PWD);
const myQService = new MyQService(myQAccount);
const garageMonitorService = new GarageMonitorService(myQService);

const monitorGarage: Handler = (event: any, context: Context, callback: Callback) => {
  garageMonitorService.monitor().then(() => {
    callback(undefined, 'success');
  }).catch(err => {
    callback(undefined, 'error');
  });
};

export { monitorGarage };
