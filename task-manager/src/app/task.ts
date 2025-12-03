import { Injectable } from '@angular/core';

export interface Task {
  nom: string;
  done: boolean;
  createdAt?: string; // ISO date string
  dueDate?: string | null; // ISO date string or null
  assignedTo?: string | null;
  type?: string | null;
  priority?: 'low' | 'medium' | 'high' | null;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { nom: 'Acheter du pain', done: false, createdAt: new Date().toISOString(), dueDate: null, assignedTo: 'Alice', type: 'Personal', priority: 'low' },
    { nom: 'Finir le TP Angular', done: false, createdAt: new Date().toISOString(), dueDate: null, assignedTo: 'Bob', type: 'Work', priority: 'high' },
    { nom: 'Appeler le client', done: true, createdAt: new Date().toISOString(), dueDate: null, assignedTo: 'Carol', type: 'Work', priority: 'medium' },
    { nom: 'Préparer le rapport', done: false, createdAt: new Date().toISOString(), dueDate: null, assignedTo: 'Bob', type: 'Work', priority: 'high' },
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

  // helper: counts by attribute value
  countsBy<T extends keyof Task>(key: T): Map<string, number> {
    const counts = new Map<string, number>();
    for (const t of this.tasks) {
      const val = (t as any)[key] ?? 'undefined';
      const s = String(val);
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
    return counts;
  }

  // convenience methods used by statistics
  countsByType(): Map<string, number> { return this.countsBy('type'); }
  countsByPriority(): Map<string, number> { return this.countsBy('priority'); }
  countsByAssignedTo(): Map<string, number> { return this.countsBy('assignedTo'); }
  countsByDone(): Map<string, number> { return this.countsBy('done'); }

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
