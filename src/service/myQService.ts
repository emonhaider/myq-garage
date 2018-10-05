import * as _ from 'underscore';
import { Device } from '../model/device';
import { DoorToggle } from '../enum/doorToggle';

export class MyQService {
  constructor(private myQAccount: any) {
  }

  async getDeviceStatus(deviceType: number): Promise<Device> {
    await this.login();
    console.log(`Getting device. Type: ${deviceType}`);
    const result: any = await this.myQAccount.getDevices([deviceType]);
    if (result.returnCode != 0) throw new Error('Error getting devices');
    return <Device>_.find(result.devices, (d: any) => {
      return d.typeId === deviceType;
    });
  }

  async setDeviceStatus(deviceId: number, doorToggle: DoorToggle): Promise<any> {
    // return await this.myQAccount.setDoorState(deviceId, doorToggle);
    console.log(`setting door state for ${deviceId} to ${doorToggle}`);
    return true;
  }

  async login() {
    const result = await this.myQAccount.login();
    if (result.returnCode != 0) throw new Error('Login failed');
  }
}