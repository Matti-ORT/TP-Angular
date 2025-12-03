import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.css'],
})
export class TaskDetail {
  task?: Task | null;
  index = -1;
  editableName = '';
  editableDone = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      const idxParam = params.get('index');
      const idx = idxParam ? Number(idxParam) : -1;
      this.index = idx;
      const t = this.taskService.getTask(idx);
      if (t) {
        this.task = t || undefined;
        this.editableName = this.task?.nom ?? '';
        this.editableDone = !!this.task?.done;
      } else {
        this.task = undefined;
      }
    });
  }

  save() {
    if (this.index < 0 || !this.task) return;
    this.taskService.updateTask(this.index, { nom: this.editableName, done: this.editableDone });
    // refresh local task reference
    this.task = this.taskService.getTask(this.index);
    // navigate back to list after save
    this.router.navigate(['/tasks']);
  }

  cancel() {
    this.editableName = this.task?.nom ?? '';
    this.editableDone = !!this.task?.done;
  }
}
