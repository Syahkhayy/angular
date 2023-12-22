import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { remove as _remove } from 'lodash-es';
import { NgModel } from '@angular/forms';
import { AuthorServiceProxy, BookListDto, BookServiceProxy, EditBookInput, Genre } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'editBookModal',
  templateUrl: './edit-book-modal.component.html'
})
export class EditBookModalComponent extends AppComponentBase {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('titleInput') titleInput: ElementRef;

  book: EditBookInput = new EditBookInput();
  editingBook: BookListDto = null;
  authors : any[] = [];
  authorfilter : string = "";
  genreEnum = Genre;

  objectValue(obj) {
    return Object.keys(obj).filter(key => isNaN(Number(key)));
  }

  getGenreStrings(genreValues: number[]): string[] {
    return genreValues.map(value => this.genreEnum[value]);
  }

  getGenreValues(genreStrings: string[]): number[] {
    return genreStrings.map(str => {
      return this.genreEnum[str];
    });
  }

  selectedAuthor: any = null;
  selectedGenres: any[] = [];
  selectedCollaborators: any[] = [];

  active: boolean = false;
  saving: boolean = false;
  bookId = null;
  stayOpen: boolean = false;

  constructor(
    injector: Injector,
    private _bookService: BookServiceProxy,
    private _authorService: AuthorServiceProxy
  ) {
    super(injector);
  }

  show(bookId): void {
    this.active = true;
    this._authorService.getAuthor(this.authorfilter).subscribe((result) => {
      this.authors = result.items;
  
      this._bookService.getBookForEdit(bookId).subscribe((result) => {
        this.book = result;
        this.bookId = bookId;
        this.selectedAuthor = this.book.authorId;
        this.selectedCollaborators = this.book.collaboratorsId;
        this.selectedGenres = this.getGenreStrings(this.book.genres);
  
        this.modal.show();
      });
    });
  }
  
  clearGenres(): void{
    this.selectedGenres = [];
  }

  clearCollabs(): void{
    this.selectedCollaborators = [];
  }

  onShown(): void {
  }

  save(): void {
    this.saving = true;
    this.book.genres = this.getGenreValues(this.selectedGenres);
    this.book.authorId = this.selectedAuthor;
    this.book.collaboratorsId = this.selectedCollaborators;
    this._bookService.editBook(this.book)
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        console.log(this.book);
        this.close();
        this.modalSave.emit(this.book);
      });
    this.saving = false;
  }

  editBook(book: BookListDto): void {
    if (book === this.editingBook) {
        this.editingBook = null;
    } else {
        this.editingBook = book;
    }
};

close(): void {
    this.modal.hide();
    this.active = false;
    this.selectedAuthor = null;
    this.selectedCollaborators = [];
    this.selectedGenres = [];
  }
}

