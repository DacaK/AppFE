import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Injectable()
export class PopupService {


    constructor(private modalService: BsModalService) { }

    modalRef: BsModalRef;

    openModal(template: TemplateRef<any>) {

        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'modal-dialog-centered' }));
    }

    openLargeModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'modal-dialog-centered modal-lg' }));
    }

    closeModal() {
        this.modalRef.hide();
    }
}