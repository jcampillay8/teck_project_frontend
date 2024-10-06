<template>
    <v-container>
      <h1>{{ $t('contact.Contact_Home_View') }}</h1>
  
      <v-form>
        <v-text-field
          label="{{ $t('contact.name') }}"
          outlined
        ></v-text-field>
  
        <v-text-field
          label="{{ $t('contact.email') }}"
          outlined
        ></v-text-field>
  
        <v-textarea
          label="{{ $t('contact.message') }}"
          outlined
          rows="5"
        ></v-textarea>
  
        <v-btn
          color="primary"
          @click="submitForm"
        >
          {{ $t('contact.submit') }}
        </v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script setup lang="ts">
  const submitForm = () => {
    // Lógica para enviar el formulario de contacto
    console.log('Formulario enviado');
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 24px;
    color: #152763;
  }
  </style>
  