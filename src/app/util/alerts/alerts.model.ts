export class Alerts {
    constructor(
        public title: string,
        public type: AlertType,
        public message: string
    ) { }
}


export enum AlertType {
    Success = 'succes',
    Danger = 'danger',
    Info = 'info',
    Warning = 'warning'
}