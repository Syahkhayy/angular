import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { remove as _remove } from 'lodash-es';
import { NgModel } from '@angular/forms';
import { AuthorListDto, AuthorServiceProxy, EditAuthorInput } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'editAuthorModal',
  templateUrl: './edit-author-modal.component.html'
})
export class EditAuthorModalComponent extends AppComponentBase {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('numberInput', { static: false }) numberInput: NgModel;

  author: EditAuthorInput = new EditAuthorInput();
  editingAuthor: AuthorListDto = null;

  active: boolean = false;
  saving: boolean = false;
  authorId = null;
  stayOpen: boolean = false;

  constructor(
    injector: Injector,
    private _authorService: AuthorServiceProxy
  ) {
    super(injector);
  }

  show(authorId): void {
    this.active = true;
    this._authorService.getAuthorForEdit(authorId).subscribe((result)=> {
      this.author = result;
      this.authorId = authorId;
      this.modal.show();
    });

  }

  onShown(): void {
   // this.nameInput.nativeElement.focus();
  }

  save(): void {
    this.saving = true;
    console.log(this.author);
    this._authorService.editAuthor(this.author)
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(this.author);
      });
    this.saving = false;
  }

  editAuthor(author: AuthorListDto): void {
    if (author === this.editingAuthor) {
        this.editingAuthor = null;
    } else {
        this.editingAuthor = author;
    }
};

// getPhoneTypeAsString(phoneType: PhoneType): string {
//   switch (phoneType) {
//       case PhoneType.Mobile:
//           return this.l('PhoneType_Mobile');
//       case PhoneType.Home:
//           return this.l('PhoneType_Home');
//       case PhoneType.Business:
//           return this.l('PhoneType_Business');
//       default:
//           return '?';
//   }
// };

resetTouched() {
  this.numberInput.control.markAsUntouched();
}

close(): void {
    this.modal.hide();
    this.active = false;
  }
}

