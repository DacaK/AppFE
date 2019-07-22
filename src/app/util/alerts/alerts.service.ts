// import { Injectable } from '@angular/core';
// import { AlertType, Alerts } from './alerts.model';

// @Injectable()
// export class AlertsService {

//     private alertSettings$ = new Subject<Alert>();

//     constructor(
//         private translate: TranslateService,
//     ) { }

//     getAlert(): Observable<any> {
//         return this.alertSettings$.asObservable();
//     }

//     success(message: string, title?: string) {
//         this.showAlert(AlertType.Success, message, title);
//     }

//     error(message: string, title?: string) {
//         this.showAlert(AlertType.Danger, message, title);
//     }

//     info(message: string, title?: string) {
//         this.showAlert(AlertType.Info, message, title);
//     }

//     warning(message: string, title?: string) {
//         this.showAlert(AlertType.Warning, message, title);
//     }

//     showAlert(type: AlertType, message: string, title?: string) {
//         this.alertSettings$.next(<Alerts>{ type: type, message: message, title: title });
//     }

//     clear() {
//         this.alertSettings$.next();
//     }

//     createAlertAndFieldValidationList(res: Response): AlertMessage[] {
//         let listAlertAndFieldValidation: AlertMessageWrapper;
//         listAlertAndFieldValidation = res.json() as AlertMessageWrapper;
//         return listAlertAndFieldValidation.messages;
//     }

//     showAlertAndFieldMessage(res: Response, fieldsErrorText, formElements) {
//         let alertMessageList: AlertMessage[] = this.createAlertAndFieldValidationList(res)
//         for (let allertMessage of alertMessageList) {
//             if (allertMessage.field == null) {
//                 this.showAlertMessage(allertMessage);
//             } else {
//                 this.setFieldValidationError(allertMessage, fieldsErrorText, formElements);
//             }
//         }
//     }

//     showAlertMessage(allertMessage: AlertMessage) {
//         switch (allertMessage.severity) {
//             case 'SUCCESS':
//                 this.success(this.translate.instant(allertMessage.text));
//                 break;
//             case 'ERROR':
//                 this.error(this.translate.instant(allertMessage.text));
//                 break;
//             case 'INFO':
//                 this.info(this.translate.instant(allertMessage.text));
//                 break;
//             case 'WARNING':
//                 this.warning(this.translate.instant(allertMessage.text));
//                 break;
//         }
//     }

//     setFieldValidationError(allertMessage: AlertMessage, fieldsErrorText, formElements) {
//         if (formElements.get(allertMessage.field)) {
//             fieldsErrorText[allertMessage.field] = allertMessage.text;
//         }
//     }
// }