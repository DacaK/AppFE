import { Vehicle } from './../vehicle/vehicle';
export class ServiceBook {
    constructor(
        public companyName?: string,
        public repairDate?: string,
        public repairKilometers?: number,
        public serviceDescription?: string,
        public vehicle?: Vehicle

    ) { }
}