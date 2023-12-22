import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { AuthorServiceProxy, CreateAuthorInput } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'createAuthorModal',
    templateUrl: './create-author-modal.component.html'
})
export class CreateAuthorModalComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal' , { static: false }) modal: ModalDirective;
    @ViewChild('nameInput' , { static: false }) nameInput: ElementRef;

    author: CreateAuthorInput = new CreateAuthorInput();

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _authorService: AuthorServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.author = new CreateAuthorInput();
        this.modal.show();
    }

    onShown(): void {
        this.nameInput.nativeElement.focus();
    }

    save(): void {
        this.saving = true;
        this._authorService.createAuthor(this.author)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(this.author);
            });
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }
}
