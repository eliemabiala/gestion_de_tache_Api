<template>
    <div>
      <h2>Utilisateurs</h2>
      <router-link to="/utilisateurs/nouveau" class="btn">Ajouter un utilisateur</router-link>
      <div v-for="user in users" :key="user.id" class="user-item">
        <div>{{ user.id }} - {{ user.name }}</div>
        <div class="user-actions">
          <button @click="startEditing(user)">Modifier</button>
          <button @click="deleteUser(user.id)">Supprimer</button>
        </div>
        <form v-if="editingUser && editingUser.id === user.id" @submit.prevent="updateUser" class="user-form">
          <label for="editName">Modifier Nom :</label>
          <input type="text" id="editName" v-model="editingUser.name">
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useUsersStore } from '../stores/users.js';
  
  const usersStore = useUsersStore();
  
  const editingUser = ref(null);
  
  function startEditing(user) {
    editingUser.value = { ...user };
  }
  
  function updateUser() {
    usersStore.updateUser(editingUser.value);
    editingUser.value = null;
  }
  
  function deleteUser(id) {
    usersStore.deleteUser(id);
  }
  
  onMounted(() => {
    usersStore.fetchUsers();
  });
  
  const users = computed(() => usersStore.users);
  </script>
  
  <style scoped>
 .btn {
  color: #fff;
  text-align: center;
  text-decoration: none;
  margin-bottom: 10px;
}
  </style>
  