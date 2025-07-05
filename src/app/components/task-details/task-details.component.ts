import {Component, signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StorageTodoService, Task } from '../../services/storage-todo.service';
import { ActivatedRoute } from '@angular/router';
import { WritableSignal } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-details-component',
  imports: [MatIconModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  standalone: true
})
export class TaskDetailsComponent {
    public selectedTodo: WritableSignal<Task | null> = signal(null)
    constructor(
        private _storageService: StorageTodoService, 
        private _activatedRoute: ActivatedRoute,
        private _router: Router) {
        const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
        const task = this._storageService.todoList().find(task => task.id === id);
        if(task) {
            this.selectedTodo.set(task);
        }
    }

    public returnToMain() {
        this._router.navigate(['/tasks'])
    }
}
