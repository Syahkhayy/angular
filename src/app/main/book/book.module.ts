import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {BookRoutingModule} from './book-routing.module';
import {BookComponent} from './book.component';
import { CreateBookModalComponent } from './create-book-modal.component';
import { EditBookModalComponent } from './edit-book-modal.component';

@NgModule({
    declarations: [BookComponent, CreateBookModalComponent, EditBookModalComponent],
    imports: [AppSharedModule, BookRoutingModule]
})
export class BookModule {}
