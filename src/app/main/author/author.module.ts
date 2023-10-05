import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {AuthorRoutingModule} from './author-routing.module';
import {AuthorComponent} from './author.component';

@NgModule({
    declarations: [AuthorComponent],
    imports: [AppSharedModule, AuthorRoutingModule]
})
export class AuthorModule {}
