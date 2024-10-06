<template>
    <v-row justify="center">
      <v-col cols="12" offset-md="1" md="10">
        <h1>{{ $t('skill_practice.Skill_Practice_Home') }}</h1>
        <p>{{ $t('skill_practice.Skill_Practice_Description') }}</p>
      </v-col>
    </v-row>
  
    <v-row justify="center">
      <!-- Tarjeta de crear nuevas habilidades -->
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>{{ $t('skill_practice.Skill_Practice_01') }}</v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-img src="../src/assets/img/girl_cat_study.png" alt="Girl studying with cat" max-width="150" max-height="150" class="mb-3"></v-img>
          </v-card-text>
          <v-card-text>
            <p>{{ $t('skill_practice.Create_New_Skill_Description') }}</p>
            <v-btn color="primary" :to="{ path: '/skill-practice/skill_practice_01' }">
              {{ $t('skill_practice.Go_Practice') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
  
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>{{ $t('skill_practice.Skill_Practice_02') }}</v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-img src="../src/assets/img/rocket.png" alt="Rocket" max-width="150" max-height="150" class="mb-3"></v-img>
          </v-card-text>
          <v-card-text>
            <p>{{ $t('skill_practice.Create_New_Skill_Description') }}</p>
            <v-btn color="primary" :to="{ path: '/skill-practice/skill_practice_02' }">
              {{ $t('skill_practice.Go_Practice') }}</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
  
      <!-- Tarjeta de habilidades recomendadas -->
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>{{ $t('skill_practice.Skill_Practice_03') }}</v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-img src="../src/assets/img/happy_man.png" alt="Happy Man" max-width="150" max-height="150" class="mb-3"></v-img>
          </v-card-text>
          <v-card-text>
            <p>{{ $t('skill_practice.Recommended_Skills_Description') }}</p>
            <v-btn color="primary" :to="{ path: '/skill-practice/skill_practice_03' }">
            {{ $t('skill_practice.Go_Practice') }}</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script setup lang="ts">
  // Aquí puedes importar cualquier componente o funcionalidad adicional que necesites
  </script>
  
  <style scoped>
  /* Añade estilos personalizados para esta vista si lo necesitas */
  </style>
  