
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from '../../basic/basic.component';
import {ComplementUserComponent  } from '../../complement-user/complement-user.component';
import { BankUserComponent } from '../../bank-user/bank-user.component';
import {DocsUserComponent  } from '../../docs-user/docs-user.component';


 const appRoutes: Routes = [   
        { path: 'basic', component: BasicComponent, },
        { path: 'compl', component: ComplementUserComponent },
        { path: 'bank', component: BankUserComponent },
        { path: 'doc', component: DocsUserComponent }
        
        ];
        
    
 
      export class ContentModule {
      }

