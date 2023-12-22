import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {Table} from 'primeng/table';
import { remove as _remove } from 'lodash-es';
import {finalize} from 'rxjs/operators';
import { BookListDto, BookServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './book.component.html',
    animations: [appModuleAnimation()]
})

export class BookComponent extends AppComponentBase implements OnInit {

    books : BookListDto[] = [];
    bookfilter : string = "";

    @ViewChild('dataTable', {static: true}) dataTable: Table;

    constructor(
        injector: Injector,
        private _bookService: BookServiceProxy,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.getBook();
    }
    getBook():void {
        this.primengTableHelper.showLoadingIndicator();

        this._bookService.getBook(this.bookfilter).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
        .subscribe(result => {
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.totalRecordsCount = result.items.length;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    formatCollaborators(collaborators: any[]): string {
        if (!collaborators || collaborators.length === 0) {
          return 'N/A';
        }
        return collaborators.map(c => c.fullName).join(', ');
    }

    deleteBook(book: BookListDto): void {
        let self = this;
        self.message.confirm(
            self.l('AreYouSureToDeleteTheBook ' + book.title),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this._bookService.deleteBook(book.id).subscribe(() => {
                        this.getBook();
                        _remove(this.books, book);
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

}
