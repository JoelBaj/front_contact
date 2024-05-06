import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'contact', component:ContactListComponent},
      {path:'new', component:ContactFormComponent},
      {path:':id/edit', component:ContactFormComponent},
      {path:'**', redirectTo:'contact'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
