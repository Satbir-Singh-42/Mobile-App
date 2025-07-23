import { apiRequest } from "./queryClient";
import type { Task, InsertTask } from "@shared/schema";

export const taskAPI = {
  // Get all tasks for the authenticated user
  async getTasks(): Promise<{ tasks: Task[] }> {
    const response = await fetch("/api/tasks", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  // Create a new task
  async createTask(task: InsertTask): Promise<{ task: Task }> {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  // Update an existing task
  async updateTask(id: string, updates: Partial<Task>): Promise<{ task: Task }> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },

  // Delete a task
  async deleteTask(id: string): Promise<{ message: string }> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return response.json();
  },

  // Toggle task completion
  async toggleTask(id: string, completed: boolean): Promise<{ task: Task }> {
    return this.updateTask(id, { completed });
  }
};