import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Injectable()
export class PopupService {


    constructor(private modalService: BsModalService) { }

    modalRef: BsModalRef;


    onUserRowSelected(data) {
        // this.selectedItems = data.selected;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'modal-dialog-centered' }));
    }

    closeModal() {
        this.modalRef.hide();
    }
}