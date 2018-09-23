"use strict";

import "mocha";
import { expect } from "chai";
import { MyQService } from "../../src/service/myQService.spec";

const myQService = new MyQService();
describe("My Q Service", () => {
  it("should return hello world", done => {
    const result = myQService.process();
    expect(result.data).to.be.equal("Hello World");
  });
});
