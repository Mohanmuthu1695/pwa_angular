import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageUploadComponent } from './pwa/image-upload/image-upload.component';

const routes: Routes = [{
  path:'',
  component:ImageUploadComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
