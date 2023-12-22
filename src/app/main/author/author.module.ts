import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {AuthorRoutingModule} from './author-routing.module';
import {AuthorComponent} from './author.component';
import { CreateAuthorModalComponent } from './create-author-modal.component';
import { EditAuthorModalComponent } from './edit-author-modal.component';

@NgModule({
    declarations: [AuthorComponent, CreateAuthorModalComponent, EditAuthorModalComponent],
    imports: [AppSharedModule, AuthorRoutingModule]
})
export class AuthorModule {}
