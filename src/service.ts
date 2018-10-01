import { GarageMonitorService } from "./service/garageMonitorService";
import { MyQService } from "./service/myQService";

const myQService = new MyQService();
const garageMonitorService = new GarageMonitorService(myQService);
garageMonitorService.monitor();