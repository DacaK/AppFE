import { Injectable } from '@angular/core';
import { AlertType, Alerts } from './alerts.model';
import { Subject, Observable } from 'rxjs';
import { AlertsMessage, AlertsMessageWrapper } from './alerts-message.model';


@Injectable()
export class AlertsService {

    private alertSettings$ = new Subject<Alerts>();

    constructor(
    
    ) { }

    getAlert(): Observable<any> {
        return this.alertSettings$.asObservable();
    }

    success(message: string, title?: string) {
        this.showAlert(AlertType.Success, message, title);
    }

    error(message: string, title?: string) {
        this.showAlert(AlertType.Danger, message, title);
    }

    info(message: string, title?: string) {
        this.showAlert(AlertType.Info, message, title);
    }

    warning(message: string, title?: string) {
        this.showAlert(AlertType.Warning, message, title);
    }

    showAlert(type: AlertType, message: string, title?: string) {
        this.alertSettings$.next(<Alerts>{ type: type, message: message, title: title });
    }

    clear() {
        this.alertSettings$.next();
    }

    createAlertAndFieldValidationList(res: Response): AlertsMessage[] {
        let listAlertAndFieldValidation: AlertsMessageWrapper;
        listAlertAndFieldValidation = res.json() as AlertsMessageWrapper;
        return listAlertAndFieldValidation.messages;
    }

    showAlertAndFieldMessage(res: Response, fieldsErrorText, formElements) {
        let alertMessageList: AlertsMessage[] = this.createAlertAndFieldValidationList(res)
        for (let allertMessage of alertMessageList) {
            if (allertMessage.field == null) {
                this.showAlertMessage(allertMessage);
            } else {
                this.setFieldValidationError(allertMessage, fieldsErrorText, formElements);
            }
        }
    }

    showAlertMessage(allertMessage: AlertsMessage) {
        switch (allertMessage.severity) {
            case 'SUCCESS':
                this.success(allertMessage.text);
                break;
            case 'ERROR':
                this.error(allertMessage.text);
                break;
            case 'INFO':
                this.info(allertMessage.text);
                break;
            case 'WARNING':
                this.warning(allertMessage.text);
                break;
        }
    }

    setFieldValidationError(allertMessage: AlertsMessage, fieldsErrorText, formElements) {
        if (formElements.get(allertMessage.field)) {
            fieldsErrorText[allertMessage.field] = allertMessage.text;
        }
    }
}