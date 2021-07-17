import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListingComponent } from './student-listing/student-listing.component';
import { AddStudentComponent } from './add-student/add-student.component';


const routes: Routes = [
  {

    path: "", component: StudentListingComponent,
  },
  {

    path: "add", component: AddStudentComponent,
  },
  { path: "edit/:id", component: AddStudentComponent },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
