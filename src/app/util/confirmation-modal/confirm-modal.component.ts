import { Component } from '@angular/core';

@Component({
    selector: 'confirm-modal',
    templateUrl: 'confirm-modal.component.html'
})

export class ConfirmModal {
    title: string;
    onClose: any;
    onSave: any;
    constructor(
    ) { }

    decline() {
        this.onClose()
    }
    confirm() {
        this.onSave()
    }
}