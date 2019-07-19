import { Authority } from "./authority";

export class Employee {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public password?: string,
        public isActive?: number,
        public authority?: Authority
    ) { }
}