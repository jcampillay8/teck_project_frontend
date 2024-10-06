<template>
    <v-container>
      <!-- Título de la página -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-center">{{ $t('about.About_Home_View') }}</h1>
        </v-col>
      </v-row>
  
      <!-- Contenido adicional -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <p>{{ $t('about.About_Description') }}</p>
          <p>{{ $t('about.About_Mission') }}</p>
          <p>{{ $t('about.About_Vision') }}</p>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  // No se requiere lógica específica por ahora
  </script>
  
  <style scoped>
  /* Estilos para el encabezado */
  h1 {
    color: #152763;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 15px;
    color: #333;
  }
  </style>
  