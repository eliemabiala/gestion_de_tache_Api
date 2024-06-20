import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
  const users = ref([]);

  async function fetchUsers() {
    try {
      const response = await fetch('https://todolist-api.rema-tech.fr/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      users.value = data['hydra:member'];
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }

  async function addUser(user) {
    try {
      const response = await fetch('https://todolist-api.rema-tech.fr/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const data = await response.json();
      users.value.push(data);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }

  async function deleteUser(id) {
    try {
      const response = await fetch(`https://todolist-api.rema-tech.fr/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      users.value = users.value.filter(user => user.id !== id);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }

  async function updateUser(updatedUser) {
    try {
      const response = await fetch(`https://todolist-api.rema-tech.fr/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const index = users.value.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        users.value[index] = updatedUser;
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  return {
    users,
    fetchUsers,
    addUser,
    deleteUser,
    updateUser,
  };
});
