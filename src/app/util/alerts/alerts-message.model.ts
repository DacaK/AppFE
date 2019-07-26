export class AlertsMessageWrapper {
    constructor(
        public statusCode?: number,
        public messages?: AlertsMessage[]
    ) { }
}

export class AlertsMessage {
    constructor(
        public code?: string,
        public text?: string,
        public severity?: AlertSeverity,
        public type?: AlertType,
        public field?: string
    ) { }
}

export enum AlertSeverity {
    success = 'SUCCESS',
    danger = 'ERROR',
    info = 'INFO',
    warning = 'WARNING'
}

export enum AlertType {
    validation = 'VALIDATION',
    logic = 'LOGIC'
}