import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AuthorListDto, AuthorServiceProxy } from '@shared/service-proxies/service-proxies';
import {Table} from 'primeng/table';
import { remove as _remove } from 'lodash-es';
import {finalize} from 'rxjs/operators';

@Component({
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.less'],
    animations: [appModuleAnimation()]
})

export class AuthorComponent extends AppComponentBase implements OnInit{
    
    authors : AuthorListDto[] = [];
    authorfilter : string = "";

    @ViewChild('dataTable', {static: true}) dataTable: Table;
    
    constructor(
        injector: Injector,
        private _authorService: AuthorServiceProxy,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.GetAuthor();
    }
    GetAuthor():void {
        this.primengTableHelper.showLoadingIndicator();

        this._authorService.getAuthor(this.authorfilter).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
        .subscribe(result => {
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.totalRecordsCount = result.items.length;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }
}
