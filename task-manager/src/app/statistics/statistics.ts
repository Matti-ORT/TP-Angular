import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css'],
})
export class Statistics {
  constructor(private taskService: TaskService) {}

  get total() { return this.taskService.getTasks().length; }

  get doneSeries() {
    const map = this.taskService.countsByDone();
    const results: Array<{label:string, value:number}> = [];
    for (const [k,v] of map.entries()) {
      results.push({ label: k, value: v});
    }
    return results;
  }

  get typeSeries() {
    const map = this.taskService.countsByType();
    const results: Array<{label:string, value:number}> = [];
    for (const [k,v] of map.entries()) results.push({label:k, value:v});
    return results;
  }

  get prioritySeries() {
    const map = this.taskService.countsByPriority();
    const results: Array<{label:string, value:number}> = [];
    for (const [k,v] of map.entries()) results.push({label:k, value:v});
    return results;
  }

  get assignedSeries() {
    const map = this.taskService.countsByAssignedTo();
    const results: Array<{label:string, value:number}> = [];
    for (const [k,v] of map.entries()) results.push({label:k, value:v});
    return results;
  }
}
