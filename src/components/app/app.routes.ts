import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { AddFormComponent } from '../add-form/add-form.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        title: 'Randomizer',
    },
    {
        path: 'edit/:id',
        component: EditFormComponent,
        title: 'Edit Details',
    },
    {
        path: 'add',
        component: AddFormComponent,
        title: 'Add Student',
    },

];
