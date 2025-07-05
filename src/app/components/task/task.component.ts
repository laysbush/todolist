import {Component, signal, WritableSignal} from '@angular/core';
import { StorageTodoService } from '../../services/storage-todo.service';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../services/storage-todo.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-component',
  imports: [ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  standalone: true
})

export class TaskComponent {
  public isNewTask: WritableSignal<boolean> = signal(false)
  public isLeftMenuOpen: WritableSignal<boolean> = signal(true)
  public isFormSubmitted: WritableSignal<boolean> = signal(false)
  public list: WritableSignal<Task[]> = signal([])
  public newTaskForm = this._fb.group({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/.*\S.*/)]),
    description: new FormControl<string>('')
  })
  public searchForm = this._fb.group({
    title: new FormControl<string>(''),
    description: new FormControl<string>('')
  })

  constructor(private _storageService: StorageTodoService, private _fb: FormBuilder) {
    this.list.set(this._storageService.todoList())
  }

  public openTask(isActive: boolean): void {
    this.isNewTask.set(isActive)
  }

  public changeFormActive(isOpenMenuForm: boolean): void {
    this.isNewTask.set(isOpenMenuForm)
    this.isLeftMenuOpen.set(isOpenMenuForm)
  }

  public addTodo(isSubmitted: boolean): void {
    if(this.newTaskForm.invalid) {
        this.isFormSubmitted.set(isSubmitted)
      return
    }
      let newTodo = {
        id: (this._storageService.todoList().length + 1),
        title: this.newTaskForm.value.title!,
        description: this.newTaskForm.value.description!,
        status: false
      }
      this._storageService.todoList.update(tasks => [...tasks, newTodo]);
      this.list.set(this._storageService.todoList())
  }

  public updateStatus(todoId: number): void {
    this._storageService.todoList.update(list =>
      list.map(todo => {
        if(todo.id === todoId) {
          todo = {...todo, status: !todo.status}
        }
        return todo
      })
    )
    this.list.set(this._storageService.todoList())
  }

  public deleteTodo(todoId: number): void {
    this._storageService.todoList.update(list => 
      list.filter(todo => todo.id !== todoId)
    )
    this.list.set(this._storageService.todoList())
  }

  public searchTodo(title: string | null | undefined, description: string | null | undefined): void {
    if(!title && !description) {
      return
    }
    this.list.set(this._storageService.todoList())
    this.list.update(list => 
      list.filter(todo => {
        if (title && !todo.title.includes(title)) return false;
        if (description && !todo.description.includes(description)) return false;
        return true;
      })
    )
  }

  public clearSearch(): void {
    this.searchForm.reset()
    this.list.set(this._storageService.todoList())
  }
}
