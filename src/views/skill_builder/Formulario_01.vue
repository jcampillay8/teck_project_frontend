<template>
  <v-row justify="center">
    <!-- Columna vacía a la izquierda -->
    <v-col cols="12" md="1"></v-col>

    <!-- Columna principal con el formulario -->
    <v-col cols="12" md="10">
      <h1>Create New Skill - Formulario 01</h1>
      <v-form>
        <!-- Campo de texto para el nombre de la habilidad -->
        <v-text-field label="Skill Name" v-model="skillName"></v-text-field>

        <!-- Primer dropdown (Skill Category) -->
        <v-select
          label="Skill Category"
          :items="categories"
          v-model="selectedCategory"
        ></v-select>

        <!-- Segundo dropdown (Topic Father) -->
        <v-select
          label="Topic Father"
          :items="topicFathers"
          v-model="selectedTopicFather"
          filterable:true
        ></v-select>
        <!-- TextArea para descripción -->
        <v-textarea
          label="Skill Description"
          v-model="skillDescription"
          rows="4"
          outlined
        ></v-textarea>

        <!-- Botón de envío -->
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
      </v-form>
    </v-col>

    <!-- Columna vacía a la derecha -->
    <v-col cols="12" md="1"></v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const skillName = ref('');
const selectedCategory = ref(null);
const selectedTopicFather = ref(null);
const categories = ref([]);  // Para los Skill Categories
const topicFathers = ref([]); // Para los Topic Fathers

// Cargar datos cuando el componente esté montado
onMounted(() => {
  // Simulación de datos de Skill Category
  categories.value = [
    'Technical',
    'Creative',
    'Management',
    'Communication',
  ];

  // Cargar los Topic Fathers desde la API
  axios.get('http://localhost:8000/skill_builder/topics/')
    .then(response => {
      topicFathers.value = response.data.map(topic => topic.topic_father);
    })
    .catch(error => {
      console.error('Error loading topic fathers:', error);
    });
});

// Función para manejar el envío del formulario
const submitForm = () => {
  console.log('Skill Name:', skillName.value);
  console.log('Selected Category:', selectedCategory.value);
  console.log('Selected Topic Father:', selectedTopicFather.value);
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
