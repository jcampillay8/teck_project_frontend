<template>
    <v-app>
      <v-app-bar app dense color="#050c3f">
        <v-toolbar-title class="white--text">
          <img :src="teckLogo" alt="Teck Logo" style="height: 35px; padding-left: 20px;">
        </v-toolbar-title>
        <v-spacer></v-spacer>
  
        <!-- Botones en pantallas grandes -->
        <v-btn
          text
          class="d-none d-md-flex"
          :class="{ 'selected-link': isActive('/') }"
          @click="navigateTo('/')"
        >
          {{ $t('authentication.sign_in') }}
        </v-btn>
        <v-btn
          text
          class="d-none d-md-flex"
          :class="{ 'selected-link': isActive('/registration') }"
          @click="navigateTo('/registration')"
        >
          {{ $t('authentication.register_an_account') }}
        </v-btn>
        <v-btn
          text
          class="d-none d-md-flex"
          :class="{ 'selected-link': isActive('/reset-password') }"
          @click="navigateTo('/reset-password')"
        >
          {{ $t('authentication.forgot_password') }}
        </v-btn>
  
        <!-- Selector de idioma -->
        <div class="language-selector d-none d-md-flex">
          <select
            id="language-select"
            @change="changeLanguage($event)"
            :value="currentLanguage"
            class="white--text"
          >
            <option value="en-US">English</option>
            <option value="es-LA">Español</option>
          </select>
        </div>
  
        <!-- Menú para pantallas pequeñas -->
        <v-btn icon @click="drawer = true" class="d-flex d-md-none white--text">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-app-bar>
  
      <!-- Contenido de AuthLayout.vue -->
      <div class="content">
        <router-view />
      </div>
  
      <!-- Menú lateral (sidebar) -->
      <v-navigation-drawer v-model="drawer" app temporary absolute color="#0c32e6">
        <v-list>
          <v-list-item @click="navigateTo('/')">
            <v-list-item-title :class="{ 'selected-link': isActive('/') }">{{ $t('authentication.sign_in') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/registration')">
            <v-list-item-title :class="{ 'selected-link': isActive('/registration') }">{{ $t('authentication.register_an_account') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/reset-password')">
            <v-list-item-title :class="{ 'selected-link': isActive('/reset-password') }">{{ $t('authentication.forgot_password') }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-select
              :items="languages"
              v-model="currentLanguage"
              @change="changeLanguage"
              label="Language"
              hide-details
              dense
              class="white--text"
            ></v-select>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import WelcomeFooterView from '@/components/WelcomeFooterView.vue';
  import teckLogo from '@/assets/img/Teck_logo.svg';
  
  const { locale } = useI18n();
  const router = useRouter();
  const drawer = ref(false);
  
  const languages = [
    { value: 'en-US', text: 'English' },
    { value: 'es-LA', text: 'Español' },
  ];
  
  const currentLanguage = ref(locale.value);
  
  watchEffect(() => {
    locale.value = currentLanguage.value;
  });
  
  function changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    currentLanguage.value = selectedLanguage;
    localStorage.setItem('language', selectedLanguage);
  }
  
  function navigateTo(route: string) {
    router.push(route);
  }
  
  function isActive(route: string) {
    return router.currentRoute.value.path === route;
  }
  </script>
  
  <style scoped>

  .welcome-header {
    background-color: #050c3f;
  }

  .language-selector {
    margin-right: 16px;
  }
  
  #language-select {
    padding: 4px;
    font-size: 14px;
    color: white;
  }
  
  .language-selector select {
    color: white; /* Letras de color blanco oscuro */
    background: transparent;
    border: none;
    font-size: 22px;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s ease;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-align-last: center;
  }
  
  .language-selector select:hover {
    background: #3a3b3c;
  }
  
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/img/gear4.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex-grow: 1;
    height: calc(100vh - 64px);
  }
  
  @media (max-width: 768px) {
    .content {
      background-position: center right 30%;
    }
  }
  
  .white--text {
    color: white !important; /* Aplica color blanco oscuro al texto */
  }
  
  .selected-link {
    color: #a2e0e0 !important; /* Color de la página seleccionada */
  }
  </style>
  