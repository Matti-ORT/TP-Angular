import { Injectable } from '@angular/core';

export interface Task {
  nom: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { nom: 'Acheter du pain', done: false },
    { nom: 'Finir le TP Angular', done: false },
    { nom: 'Appeler le client', done: false },
    { nom: 'Préparer le rapport', done: false },
  ];

  private readonly storageKey = 'tasks';

  constructor() {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // basic assignment (no deep validation)
          this.tasks = parsed as Task[];
        }
      }
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(index: number): Task | undefined {
    if (index < 0 || index >= this.tasks.length) return undefined;
    return this.tasks[index];
  }

  addTask(nom: string) {
    if (!nom?.trim()) return;
    this.tasks.push({ nom: nom.trim(), done: false });
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
  }

  removeTask(index: number) {
    if (index < 0 || index >= this.tasks.length) return;
    this.tasks.splice(index, 1);
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
  }

  toggleDone(index: number) {
    if (index < 0 || index >= this.tasks.length) return;
    this.tasks[index].done = !this.tasks[index].done;
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
  }

  updateTask(index: number, changes: Partial<Task>) {
    if (index < 0 || index >= this.tasks.length) return;
    const t = this.tasks[index];
    if (!t) return;
    if (changes.nom !== undefined) t.nom = changes.nom;
    if (changes.done !== undefined) t.done = changes.done;
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
  }
}
