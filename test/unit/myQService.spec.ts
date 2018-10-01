"use strict";

import "mocha";
import * as sinon from 'sinon';
import * as moment from "moment";

import { GarageMonitorService } from "../../src/service/garageMonitorService";
import { MyQService } from "../../src/service/myQService";
import { Device } from "../../src/model/device";
import { DoorState } from "../../src/enum/doorToggle";

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

let openDevice: Device = {
  id: 1,
  typeId: 2,
  typeName: 'GarageDoorOpener',
  serialNumber: 'xxxx',
  online: true,
  name: 'GarageDoorOpener',
  doorState: DoorState.Open,
  doorStateUpdated: moment(new Date()).add(-30, 'm').unix(),
  doorStateDescription: 'xxxx'
};

let openDeviceInLast10Minutes: Device = {
  id: 1,
  typeId: 2,
  typeName: 'GarageDoorOpener',
  serialNumber: 'xxxx',
  online: true,
  name: 'GarageDoorOpener',
  doorState: DoorState.Open,
  doorStateUpdated: moment(new Date()).add(-10, 'm').unix(),
  doorStateDescription: 'xxxx'
};

describe("My Q Service", () => {
  let sandbox;
  let getDeviceStatusStub;
  let setDeviceStatusSpy;
  const myQService = new MyQService();
  const monitorService = new GarageMonitorService(myQService);
  process.env.MY_Q_USERNAME = 'test';
  process.env.MY_Q_PWD = 'test';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    getDeviceStatusStub = sandbox.stub(myQService, 'getDeviceStatus');
    setDeviceStatusSpy = sandbox.spy(myQService, 'setDeviceStatus');
    const myqLoginStub = sandbox.stub(myQService, 'login');
    myqLoginStub.resolves(true);
  });
  it("should not try to close garage door", done => {
    getDeviceStatusStub.resolves(closedDevice);
    monitorService.monitor().then(() => {
      sinon.assert.callCount(setDeviceStatusSpy, 0);
      done();
    });
  });
  it("should try to close garage door", (done) => {
    getDeviceStatusStub.resolves(openDevice);
    monitorService.monitor().then(() => {
      sinon.assert.calledOnce(setDeviceStatusSpy);
      done();
    });
  });
  it("should try to close garage door", (done) => {
    getDeviceStatusStub.resolves(openDeviceInLast10Minutes);
    monitorService.monitor().then(() => {
      sinon.assert.callCount(setDeviceStatusSpy, 0);
      done();
    });
  });
  afterEach(() => {
    sandbox.restore();
  });
});


