import { Routes } from '@angular/router';
import { TaskList as TaskListComponent } from './task-list/task-list';
import { Home as HomeComponent } from './home/home';
import { TaskDetail as TaskDetailComponent } from './task-detail/task-detail';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/:index', component: TaskDetailComponent },
    { path: '**', redirectTo: '' }
];
