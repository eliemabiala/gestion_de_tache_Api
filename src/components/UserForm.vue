<template>
    <div>
      <router-link to="/utilisateurs" class="btn">Retour</router-link>
      <h2>Ajouter un nouvel utilisateur</h2>
      <form @submit.prevent="addNewUser" class="user-form">
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="newUser.name" required>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useUsersStore } from '../stores/users.js';
  
  const usersStore = useUsersStore();
  
  const newUser = ref({
    name: '',
    firstname: '',
    lastname: '',
    email:'',
    phone: '',
    roles: ''

  });
  
  async function addNewUser() {
    await usersStore.addUser(newUser.value);
    newUser.value.name = '';
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
  