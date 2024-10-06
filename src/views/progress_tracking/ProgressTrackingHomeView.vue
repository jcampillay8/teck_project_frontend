<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>{{ $t('progress_tracking.Progress_Tracking_Home') }}</h1>
          <p>{{ $t('progress_tracking.Progress_Description') }}</p>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>{{ $t('progress_tracking.Recent_Progress') }}</v-card-title>
            <v-card-text>
              <p>{{ $t('progress_tracking.Recent_Progress_Description') }}</p>
              <!-- Aquí puedes añadir componentes como gráficos de progreso -->
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>{{ $t('progress_tracking.Overall_Progress') }}</v-card-title>
            <v-card-text>
              <p>{{ $t('progress_tracking.Overall_Progress_Description') }}</p>
              <!-- Aquí puedes añadir componentes como gráficos de progreso total -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  // Aquí puedes importar cualquier componente o utilidad adicional que necesites
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados para esta vista */
  </style>
  