import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskList {

  constructor(private taskService: TaskService) {}

  get tasks(): Task[] { return this.taskService.getTasks(); }

  newTask = signal('');

  addTask() {
    const value = this.newTask().trim();
    if (!value) return;
    this.taskService.addTask(value);
    this.newTask.set('');
  }

  deleteTask(index: number) {
    if (index < 0 || index >= this.tasks.length) return;
    this.taskService.removeTask(index);
  }
  doneTask(index : number) {
    this.taskService.toggleDone(index);
  }

}
