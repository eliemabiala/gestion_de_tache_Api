// stores/useTasksStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([]);

  async function fetchTasks() {
    try {
      const response = await fetch('https://todolist-api.rema-tech.fr/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      tasks.value = data['hydra:member'];
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }

  async function addTask(task) {
    tasks.value.push(task);
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`https://todolist-api.rema-tech.fr/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      tasks.value = tasks.value.filter(task => task.id !== id);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }

  async function updateTask(updatedTask) {
    try {
      const response = await fetch(`https://todolist-api.rema-tech.fr/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const index = tasks.value.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
  };
});
