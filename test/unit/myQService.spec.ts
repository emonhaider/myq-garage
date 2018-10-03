'use strict';

import "mocha";
import * as MyQApi from 'myq-api';
import * as sinon from 'sinon';
import { MyQService } from "../../src/service/myQService";
import { Device } from "../../src/model/device";
import { DoorState } from "../../src/enum/doorToggle";
import { expect } from "chai";

process.env.MY_Q_USERNAME = 'test';
process.env.MY_Q_PWD = 'test';

let closedDevice: Device = {
  id: 1,
  typeId: 2,
  typeName: 'GarageDoorOpener',
  serialNumber: 'xxxx',
  online: true,
  name: 'GarageDoorOpener',
  doorState: DoorState.Closed,
  doorStateUpdated: new Date().getTime(),
  doorStateDescription: 'xxxx'
};

describe('MyQ Service', () => {
  let sandbox;
  let getDevicesStub;
  const myQAccount: any = new MyQApi(process.env.MY_Q_USERNAME, process.env.MY_Q_PWD);
  const myQService = new MyQService(myQAccount);
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    getDevicesStub = sandbox.stub(myQAccount, 'getDevices');
    getDevicesStub.resolves({ returnCode: 0, devices: [closedDevice] });
    const myqLoginStub = sandbox.stub(myQService, 'login');
    myqLoginStub.resolves({});
  });
  it('should return a closed device', (done) => {
    myQService.getDeviceStatus(2).then((d) => {
      expect(d.typeId).to.be.equal(2);
      done();
    }).catch(err => {
      console.log(err);
      done(err);
    });
  });
});