import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        loadComponent: () => import('./components/task/task.component').then(c => c.TaskComponent)
    },
    {
        path: 'tasks/:id',
        loadComponent: () => import('./components/task-details/task-details.component').then(c => c.TaskDetailsComponent)
    },
    {
        path: '**',
        redirectTo: '/tasks',
        pathMatch: 'full'
    }
];
