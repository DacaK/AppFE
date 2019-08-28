import { Employee } from "../employee/employee";
import { Vehicle } from "../vehicle/vehicle";
import { TravelStatus } from "./travel-status";

export class TravelOrder {
    constructor(
        public id?: number,
        public actDistance?: number,
        public adminNote?: string,
        public dateEnd?: string,
        public dateStart?: string,
        public destination?: string,
        public empNote?: string,
        public estDistance?: number,
        public fuelConsumed?: number,
        public employee?: Employee,
        public travelStatus?: TravelStatus,
        public vehicle?: Vehicle,
        public createdAt?: string
    ) { }
}