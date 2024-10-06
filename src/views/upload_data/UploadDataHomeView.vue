<template>
  <v-row justify="center">
    <v-col cols="12" offset-md="1" md="10">
      <h1>{{ $t('upload_data.Upload_Data_Home') }}</h1>
      <p>{{ $t('upload_data.Upload_Data_Description') }}</p>
    </v-col>
  </v-row>

  <v-row justify="center">
    <!-- Columna vacía a la izquierda -->
    <v-col cols="12" md="1"></v-col>

    <!-- Tarjeta para agregar nueva estructura de datos -->
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>{{ $t('upload_data.Upload_Data_New_Structure') }}</v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img src="../src/assets/img/uploadData/structure.png" alt="Girl studying with cat" max-width="250" max-height="250" class="mb-3"></v-img>
        </v-card-text>
        <v-card-text>
          <p>{{ $t('upload_data.Upload_Data_Description') }}</p>
          <v-btn color="primary" @click="proceedToNewStructure">
            {{ $t('upload_data.Upload_Data_Proceed') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Tarjeta para cargar datos en estructura existente -->
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>{{ $t('upload_data.Upload_Data_Existing_Estructure') }}</v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img src="../src/assets/img/uploadData/structure2.png" alt="Rocket" max-width="350" max-height="350" class="mb-3"></v-img>
        </v-card-text>
        <v-card-text>
          <p>{{ $t('upload_data.Upload_Data_Description') }}</p>
          <v-btn color="primary" :to="{ path: '/upload-data/existing-structure' }">
            {{ $t('upload_data.Upload_Data_Proceed') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Tarjeta adicional -->
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>{{ $t('upload_data.View_Upload_Data') }}</v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img src="../src/assets/img/uploadData/structure3.png" alt="Additional Option" max-width="250" max-height="250" class="mb-3"></v-img>
        </v-card-text>
        <v-card-text>
          <p>{{ $t('upload_data.Upload_Data_Additional_Description') }}</p>
          <v-btn color="primary" :to="{ path: '/upload-data/additional-option' }">
            {{ $t('upload_data.Upload_Data_Proceed') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Columna vacía a la derecha -->
    <v-col cols="12" md="1"></v-col>
  </v-row>

  <!-- Mensaje de advertencia para los usuarios sin permisos de superusuario -->
  <v-row justify="center" v-if="!userStore.userData?.is_superuser && showWarning">
    <v-col cols="12" md="10">
      <v-alert type="warning" class="mt-4">
        No tienes permisos de administrador para acceder a esta función.
      </v-alert>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const showWarning = ref(false);

const proceedToNewStructure = () => {
  if (userStore.userData?.is_superuser) {
    // Si el usuario es superusuario, redirigir a la página de nueva estructura de datos
    router.push({ path: '/upload-data/new-structure' });
  } else {
    // Si no es superusuario, mostrar el mensaje de advertencia
    showWarning.value = true;
  }
};
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
</style>
