<template>
  <v-row justify="center">
    <v-col cols="12" offset-md="1" md="10">
      <h1>{{ $t('skill_builder.Skill_Builder_Home') }}</h1>
      <p>{{ $t('skill_builder.Skill_Builder_Description') }}</p>
    </v-col>
  </v-row>

  <v-row justify="center">
    <!-- Tarjeta de crear nuevas habilidades -->
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>{{ $t('skill_builder.Create_New_Skill') }}</v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img src="../src/assets/img/girl_cat_study.png" alt="Girl studying with cat" max-width="150" max-height="150" class="mb-3"></v-img>
        </v-card-text>
        <v-card-text>
          <p>{{ $t('skill_builder.Create_New_Skill_Description') }}</p>
          <v-btn color="primary" :to="{ path: '/skill-builder/Formulario_01' }">
            {{ $t('skill_builder.Create') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>{{ $t('skill_builder.Create_New_Skill') }}</v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img src="../src/assets/img/rocket.png" alt="Rocket" max-width="150" max-height="150" class="mb-3"></v-img>
        </v-card-text>
        <v-card-text>
          <p>{{ $t('skill_builder.Create_New_Skill_Description') }}</p>
          <v-btn color="primary" :to="{ path: '/skill-builder/Formulario_02' }">
            {{ $t('skill_builder.Create') }}</v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Tarjeta de habilidades recomendadas -->
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>{{ $t('skill_builder.Recommended_Skills') }}</v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img src="../src/assets/img/happy_man.png" alt="Happy Man" max-width="150" max-height="150" class="mb-3"></v-img>
        </v-card-text>
        <v-card-text>
          <p>{{ $t('skill_builder.Recommended_Skills_Description') }}</p>
          <v-btn color="primary" :to="{ path: '/skill-builder/Formulario_03' }">
          {{ $t('skill_builder.Create') }}</v-btn>
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
