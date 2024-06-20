<template>
    


  <router-link to="/taches"><h3>Retour</h3></router-link>
  <div>
    <h2>Ajouter une nouvelle tâche</h2>
    <form @submit.prevent="addNewTask" class="task-form">
      <label for="title">Titre :</label>
      <input type="text" id="title" v-model="newTask.title" required>

      <label for="deadline">Date limite :</label>
      <input type="datetime-local" id="deadline" v-model="newTask.deadline" required>

      <label for="description">Description :</label>
      <textarea id="description" v-model="newTask.description"></textarea>

      <label for="status">Statut :</label>
      <input type="text" id="status" v-model="newTask.status">
      
      <button type="submit"><router-link to="/taches/TacheDetail" class="btn">Ajouter</router-link></button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTasksStore } from '../stores/index.js';

const tasksStore = useTasksStore();

const newTask = ref({
  title: '',
  deadline: '',
  description: '',
  status: ''
});

async function addNewTask() {
    const response = await fetch('https://todolist-api.rema-tech.fr/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify({
        title: newTask.value.title,
        deadline: newTask.value.deadline,
        description: newTask.value.description,
        status: newTask.value.status
      }),
    });

    if (!response.ok) {
      throw new Error('Échec de l\'ajout de la tâche');
    }

    const data = await response.json();
    console.log(data);

    tasksStore.addTask({
      id: data.id,
      title: data.title,
      deadline: data.deadline,
      description: data.description,
      status: data.status
    });

    newTask.value.title = '';
    newTask.value.deadline = '';
    newTask.value.description = '';
    newTask.value.status = '';
}
</script>

<style scoped> 
.btn {
  color: #fff;
  text-align: center;
  text-decoration: none;
  margin-bottom: 10px;
}
</style>
