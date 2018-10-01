export interface Device {
  id: number,
  typeId: number,
  typeName: string,
  serialNumber: string,
  online: boolean,
  name: string,
  doorState: number,
  doorStateDescription: string,
  doorStateUpdated: number
}
