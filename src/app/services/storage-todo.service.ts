import { Injectable, signal } from '@angular/core';
import { WritableSignal } from '@angular/core';

export interface Task {
    id: number,
    title: string,
    description: string,
    status: boolean
}

@Injectable({
  providedIn: 'root', 
})

export class StorageTodoService {
  public todoList: WritableSignal<Task[]> = signal([])
}
