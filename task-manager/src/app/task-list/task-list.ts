import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {

  tasks: string[] = [
    'Acheter du pain',
    'Finir le TP Angular',
    'Appeler le client',
    'Préparer le rapport'
  ];

  newTask = signal('');

}
