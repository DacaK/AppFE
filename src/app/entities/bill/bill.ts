import { TravelOrder } from "../travel-order/travel-order";

export class Bill {
    constructor(
        public id?: number,
        public billNum?: number,
        public sum?: number,
        public travelOrder?: TravelOrder
    ) { }
}