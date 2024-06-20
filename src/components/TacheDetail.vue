<template>
  
  <router-link to="/taches"><h3>Retour</h3></router-link>
  <div>
    <h2>Affichage des tâches</h2>
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <div>
        <span v-if="detailedTaskId !== task.id">{{ task.id }} - {{ task.title }}</span>
        <span v-else>{{ task.id }} - {{ task.firstname }} - {{ task.password }} - {{ task.description }} - {{ task.status }}</span>
      </div>
      <div class="task-actions">
        <button @click="toggleDetails(task.id)">Voir</button>
        <button @click="startEditing(task)">Modifier</button>
        <button @click="deleteTask(task.id)">Supprimer</button>
      </div>
      <form v-if="editingTask && editingTask.id === task.id" @submit.prevent="updateTask" class="task-form">
        <label for="editTitle">Modifier Titre :</label>
        <input type="text" id="editTitle" v-model="editingTask.title">

        <label for="editDeadline">Modifier Date limite :</label>
        <input type="datetime-local" id="editDeadline" v-model="editingTask.deadline">

        <label for="editDescription">Modifier Description :</label>
        <textarea id="editDescription" v-model="editingTask.description"></textarea>

        <label for="editStatus">Modifier Statut :</label>
        <input type="text" id="editStatus" v-model="editingTask.status">

        <button type="submit">Mettre à jour Tâche</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTasksStore } from '../stores/index.js';

const tasksStore = useTasksStore();
const router = useRouter();

const newTask = ref({
  title: '',
  deadline: '',
  description: '',
  status: ''
});

const editingTask = ref(null);
const detailedTaskId = ref(null);

function startEditing(task) {
  editingTask.value = { ...task };
  console.log(editingTask.value);
}

function toggleDetails(id) {
  detailedTaskId.value = detailedTaskId.value === id ? null : id;
}

 function updateTask() {
   tasksStore.updateTask(editingTask.value);
  editingTask.value = null;
}

 function deleteTask(id) {
   tasksStore.deleteTask(id);
}

onMounted(() => {
  tasksStore.fetchTasks();
});

const tasks = computed(() => tasksStore.tasks);
console.log(tasks);
</script>

<style scoped>
</style>
