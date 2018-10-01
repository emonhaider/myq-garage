import { MyQService } from "./myQService";
import { DeviceType } from "../enum/deviceTypes";
import { DoorState, DoorToggle } from "../enum/doorToggle";
import * as moment from 'moment';
export class GarageMonitorService {
  myQService = new MyQService();
  private allowedPeriod: number = 15;
  constructor() {
    if (process.env.DOOR_OPEN_ALLOWED_PERIOD) {
      this.allowedPeriod = +process.env.DOOR_OPEN_ALLOWED_PERIOD;
    }
  }

  async monitor() {
    console.debug('Starting monitor');
    const device = await this.myQService.getDeviceStatus(DeviceType.GarageDoorOpener);
    if (device && device.doorState === DoorState.Open) {
      const epoch = moment(new Date()).add(-1 * this.allowedPeriod, 'm').unix();
      if (epoch > device.doorStateUpdated) {
        await this.myQService.setDeviceStatus(device.id, DoorToggle.CloseDoor);
      }
    } else {
      console.log('Door is closed');
    }
  }
}
