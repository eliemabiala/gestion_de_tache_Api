<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/taches">Tâches</router-link>
          <router-link to="/utilisateurs">Utilisateurs</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
</style>
