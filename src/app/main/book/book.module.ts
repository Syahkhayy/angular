import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {BookRoutingModule} from './book-routing.module';
import {BookComponent} from './book.component';

@NgModule({
    declarations: [BookComponent],
    imports: [AppSharedModule, BookRoutingModule]
})
export class BookModule {}
