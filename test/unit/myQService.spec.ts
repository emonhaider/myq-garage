"use strict";

import "mocha";
import { expect } from "chai";
import { GarageMonitorService } from "../../src/service/garageMonitorService";

const myQService = new GarageMonitorService();
describe("My Q Service", () => {
  it("should return hello world", done => {
    const result = myQService.monitor();
    expect(result.data).to.be.equal("Hello World!");
    done();
  });
});
