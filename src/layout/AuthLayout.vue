<template>
    <v-app class="auth-layout">
      <WelcomeHeaderView />
      <!-- <div class="content">
        <router-view />
      </div> -->
      <WelcomeFooterView />
    </v-app>
  </template>
  
  <script setup lang="ts">
  import WelcomeHeaderView from '@/components/WelcomeHeaderView.vue';
  import WelcomeFooterView from '@/components/WelcomeFooterView.vue';
  </script>
  
  <style scoped>
  .auth-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* Asegura que ocupe todo el ancho de la pantalla */
    height: 100%; /* Opcional: Asegura que ocupe toda la altura disponible */
    background-image: url('@/assets/img/gear4.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0; /* Elimina cualquier margen que pueda limitar el ancho */
    padding: 0; /* Elimina cualquier padding interno */
  }
  
  @media (max-width: 768px) {
    .content {
      background-position: center right 30%; /* Ajusta la posición de la imagen en pantallas pequeñas */
    }
  }
  </style>
  