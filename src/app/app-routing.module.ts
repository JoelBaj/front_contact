import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'contacto',
    loadChildren:()=>import('./contactos/contactos.module').then(m => m.ContactosModule)
  },
  {
    path:'**',
    redirectTo:'contacto'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
