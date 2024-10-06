<template>
  <v-app :theme="theme">
    <!-- Barra superior: visible solo en pantallas grandes -->
    <v-app-bar
      v-if="isLargeScreen"
      dense
      flat
      style="min-height: 32px; padding: 0; background-color: #050c3f;"
    >
      <v-col cols="auto">
        <p class="white--text pa-2" style="font-size: 12px;">{{ $t('authentication.user_id') }}: {{ userStore.userData.id }}</p>
      </v-col>
      <v-col cols="auto">
        <p class="white--text pa-2" style="font-size: 12px;">{{ $t('authentication.email') }}: {{ userStore.userData.email }}</p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn text class="white--text pa-2" style="font-size: 12px;" @click="navigateTo('/logout')">
          {{ $t('authentication.logout') }}
        </v-btn>
      </v-col>
    </v-app-bar>

    <!-- Barra de navegación: ocupa todo el espacio cuando la barra superior no está -->
    <v-app-bar
      app
      dense
      color="#050c3f"
      :class="{'v-app-bar-adjust': !isLargeScreen}"
    >
        <v-toolbar-title class="white--text">
          <img :src="teckLogo" alt="Teck Logo" style="height: 35px; padding-left: 20px;">
        </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Botones de navegación en pantallas grandes -->
      <v-btn
        text
        class="d-none d-md-flex"
        :class="{ 'selected-link': isActive('/home') }"
        @click="navigateTo('/home')"
      >
        {{ $t('menu_home.Home') }}
      </v-btn>
      <v-btn
        text
        class="d-none d-md-flex"
        :class="{ 'selected-link': isSkillPracticeActive() }"
        @click="navigateTo('/upload-data')"
      >
        {{ $t('menu_home.Upload Data') }}
      </v-btn>
      <v-btn
        text
        class="d-none d-md-flex"
        :class="{ 'selected-link': isSkillBuilderActive() }"
        @click="navigateTo('/skill-builder')"
      >
        {{ $t('menu_home.Skill Builder') }}
      </v-btn>
      <v-btn
        text
        class="d-none d-md-flex"
        :class="{ 'selected-link': isActive('/home/progress-tracking') }"
        @click="navigateTo('/home/progress-tracking')"
      >
        {{ $t('menu_home.Progress Tracking') }}
      </v-btn>
      <v-btn
        text
        class="d-none d-md-flex"
        :class="{ 'selected-link': isActive('/home/about') }"
        @click="navigateTo('/home/about')"
      >
        {{ $t('menu_home.About') }}
      </v-btn>
      <v-btn
        text
        class="d-none d-md-flex"
        :class="{ 'selected-link': isActive('/home/contact') }"
        @click="navigateTo('/home/contact')"
      >
        {{ $t('menu_home.Contact') }}
      </v-btn>

      <!-- Selector de idioma -->
      <div class="language-selector d-none d-md-flex">
        <select
          id="language-select"
          @change="changeLanguage"
          v-model="currentLanguage"
          :class="[theme === 'dark' ? 'dark-text' : 'light-text']"
        >
          <option value="en-US">English</option>
          <option value="es-LA">Español</option>
        </select>
      </div>

      <!-- Botón Luna/Sol para cambiar de tema -->
      <v-btn icon @click="toggleTheme" class="white--text">
        <v-icon>{{ theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>

      <!-- Botón sandwich para pantallas pequeñas -->
      <v-btn icon @click="drawer = true" class="d-flex d-md-none white--text">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Menú lateral (sidebar) que aparece en pantallas pequeñas -->
    <v-navigation-drawer v-model="drawer" app temporary absolute color="#050c3f">
      <v-list>
        <!-- Información del usuario en el menú de pantallas pequeñas -->
        <v-list-item v-if="userStore.userData" class="user-info-small-screen">
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ $t('authentication.user_id') }}: {{ userStore.userData.id }}</v-list-item-title>
            <v-list-item-subtitle class="white--text">{{ $t('authentication.email') }}: {{ userStore.userData.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn text class="white--text" @click="navigateTo('/logout')">
              {{ $t('authentication.logout') }}
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item @click="navigateTo('/home')">
          <v-list-item-title :class="{ 'selected-link': isActive('/home') }">{{ $t('menu_home.Home') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/upload-data')">
          <v-list-item-title :class="{ 'selected-link': isSkillPracticeActive() }">{{ $t('menu_home.Upload Data') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/skill-builder')">
          <v-list-item-title :class="{ 'selected-link': isSkillBuilderActive() }">{{ $t('menu_home.Skill Builder') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/home/progress-tracking')">
          <v-list-item-title :class="{ 'selected-link': isActive('/home/progress-tracking') }">{{ $t('menu_home.Progress Tracking') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/home/about')">
          <v-list-item-title :class="{ 'selected-link': isActive('/home/about') }">{{ $t('menu_home.About') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/home/contact')">
          <v-list-item-title :class="{ 'selected-link': isActive('/home/contact') }">{{ $t('menu_home.Contact') }}</v-list-item-title>
        </v-list-item>

        <!-- Selector de idioma para pantallas pequeñas -->
        <v-list-item>
          <select
            v-model="currentLanguage"
            @change="changeLanguage"
            style="color: white !important;"
          >
            <option value="en-US">English</option>
            <option value="es-LA">Español</option>
          </select>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main>
      <div class="home-content">
        <router-view />
      </div>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; 2024 Teck Resources Limited/JCR. All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import teckLogo from '@/assets/img/Teck_logo.svg';

// Get the user store
const userStore = useUserStore();
const { locale } = useI18n();
const router = useRouter();
const drawer = ref(false);
const theme = ref('dark'); // Inicializa el tema en modo oscuro

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

function isSkillBuilderActive() {
  return router.currentRoute.value.path.startsWith('/skill-builder');
}

function isSkillPracticeActive() {
  return router.currentRoute.value.path.startsWith('/upload-data');
}

function isActive(route: string) {
  return router.currentRoute.value.path === route;
}

// Detectar el tamaño de la pantalla
const isLargeScreen = ref(window.innerWidth >= 960);

// Actualizar el valor cuando cambia el tamaño de la pantalla
window.addEventListener('resize', () => {
  isLargeScreen.value = window.innerWidth >= 960;
});

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}
</script>

<style scoped>
.language-selector {
  margin-right: 16px;
}

#language-select {
  padding: 4px;
  font-size: 14px;
  color: white;
}

.language-selector select {
  background: transparent;
  border: none;
  font-size: 22px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  appearance: none;
  text-align-last: center;
}

.language-selector select:hover {
  background: #3a3b3c;
}

/* Clases dinámicas para cambiar color según el tema */
.dark-text {
  color: white;
}

.light-text {
  color: black;
}

.home-content {
  padding-top: 16px;
}

.selected-link {
  color: #a2e0e0 !important;
}

/* Ajuste de la barra inferior cuando la superior desaparece */
.v-app-bar-adjust {
  transition: margin-top 0.3s ease;
}
</style>
