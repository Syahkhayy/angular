import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' }
                    },
                    {
                        path: 'author',
                        loadChildren: () => import('./author/author.module').then(m => m.AuthorModule),
                        
                    },
                    {
                        path: 'book',
                        loadChildren: () => import('./book/book.module').then(m => m.BookModule),
                        
                    },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
