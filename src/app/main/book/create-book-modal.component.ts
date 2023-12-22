import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { AuthorListDto, AuthorServiceProxy, BookServiceProxy, CreateBookInput, Genre } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'createBookModal',
    templateUrl: './create-book-modal.component.html'
})
export class CreateBookModalComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal' , { static: false }) modal: ModalDirective;
    @ViewChild('titleInput' , { static: false }) titleInput: ElementRef;

    book: CreateBookInput = new CreateBookInput();
    authors : any[] = [];
    authorfilter : string = "";
    genreEnum = Genre;
    
    objectValue(obj) {
        return Object.keys(obj).filter(key => isNaN(Number(key)));
      }

    selectedAuthor: any = null;
    selectedGenres: Genre[] = [];
    selectedCollaborators: any[] = [];

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _bookService: BookServiceProxy,
        private _authorService: AuthorServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.book = new CreateBookInput();
        this.modal.show();
    }

    clearGenres(): void{
        this.selectedGenres = [];
      }
    
      clearCollabs(): void{
        this.selectedCollaborators = [];
      }

    onShown(): void {
        this.titleInput.nativeElement.focus();
        this._authorService.getAuthor(this.authorfilter).subscribe((result)=> {
            this.authors = result.items;
          });
    }

    save(): void {
        this.saving = true;
        this.book.genres = this.selectedGenres;
        this.book.authorId = this.selectedAuthor;
        this.book.collaboratorsId = this.selectedCollaborators;
        this._bookService.createBook(this.book)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(this.book);
            });
    }


    close(): void {
        this.modal.hide();
        this.active = false;
        this.selectedAuthor = null;
        this.selectedCollaborators = [];
        this.selectedGenres = [];
    }
       
    
}

  
  
