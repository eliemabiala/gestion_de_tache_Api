<template>
  <div class="container">
  
      <router-link to="/taches/TacheForm" class="btn">Créer une tâche</router-link>

      <router-link to="/taches/TacheDetail" class="btn">Afficher toutes les tâches</router-link>
    </div>

</template>

<script>
export default {
  name: 'Taches'
};
</script>

<style scoped>

.btn {
  display: inline-block;
  font-size: 17px;
  padding: 10px 15px;
  background-color: #212b36;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  text-align: center;
  text-decoration: none;
  margin-bottom: 10px;
}
</style>
