<template>
  <v-row justify="center">
    <!-- Columna vacía a la izquierda -->
    <v-col cols="12" md="1"></v-col>

    <!-- Columna principal con el formulario -->
    <v-col cols="12" md="10">
      <h1>Create New Skill - Formulario 02</h1>
      <v-form>
        <!-- Seleccionador de lenguajes -->
        <v-select
          label="Select Language"
          :items="languages"
          v-model="selectedLanguage"
          filterable
          item-text="language"
          item-value="language"
        ></v-select>

        <!-- Campo de texto para ingresar múltiples valores -->
        <v-text-field
          label="Enter multiple values"
          v-model="multipleValues"
          hint="Use commas to separate values"
          persistent-hint
        ></v-text-field>

        <v-select
          label="Select number tokens"
          :items="tokens"
          v-model="selectedNumTokens"
          filterable
          item-text="tokens"
          item-value="tokens"
          class="mt-4"
        ></v-select>

        <!-- Mensaje de alerta -->
        <v-alert v-if="alertMessage" :type="alertType" class="mt-4">
          {{ alertMessage }}
        </v-alert>

        <!-- Botón de envío -->
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
      </v-form>

      <!-- Tabla editable con las oraciones generadas -->
      <v-table v-if="generatedSentences.length > 0" class="mt-4">
        <thead>
          <tr>
            <th>Oración</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sentence, index) in generatedSentences" :key="index">
            <td>
              <v-confirm-edit v-model="generatedSentences[index]">
                <template v-slot:default="{ model: proxyModel, actions }">
                  <v-card class="mx-auto" max-width="1600" >
                    <template v-slot:text>
                      <v-text-field
                        v-model="proxyModel.value"
                        label="Modify my value"
                        class="wrapped-text" 
                      ></v-text-field>
                    </template>

                    <template v-slot:actions>
                      <v-spacer></v-spacer>
                      <component :is="actions"></component>
                    </template>
                  </v-card>
                </template>
              </v-confirm-edit>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>

    <!-- Columna vacía a la derecha -->
    <v-col cols="12" md="1"></v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import { ref, shallowRef } from 'vue';

export default {
  setup() {
    const selectedLanguage = ref('');
    const multipleValues = ref('');
    const selectedNumTokens = ref(100); // Valor preseleccionado por defecto
    const languages = ref([
      'English', 
      'Spanish', 
      'French', 
      'Japanese', 
      'German', 
      'Chinese',
    ]);
    const tokens = ref([100, 250, 500, 750, 1000]); // Lista de tokens disponibles
    const alertMessage = ref('');
    const alertType = ref('error');
    const generatedSentences = ref([]); // Almacena las oraciones generadas

    const submitForm = async () => {
      if (!selectedLanguage.value || !multipleValues.value || !selectedNumTokens.value) {
        alertMessage.value = 'Please enter a language, some words, and select the number of tokens';
        alertType.value = 'error';
        return;
      }

      const words = multipleValues.value.split(',').map(word => word.trim()).filter(word => word);

      // Verifica si la cantidad de palabras es mayor a 5
      if (words.length > 5) {
        alertMessage.value = 'La cantidad de valores ingresados en sub tópicos no puede ser mayor a 5 valores';
        alertType.value = 'warning';
        return;
      }

      try {
        const params = new URLSearchParams();
        params.append('language', selectedLanguage.value);
        words.forEach(word => {
          params.append('words[]', word);
        });
        params.append('num_tokens', selectedNumTokens.value); // Agrega el número de tokens seleccionados

        const response = await axios.get('http://localhost:8000/skill_builder/check_spelling/', {
          params: params
        });

        alertMessage.value = response.data.message;
        // Cambia el tipo de alerta a 'warning' si el mensaje incluye palabras incorrectas
        alertType.value = response.data.status === 'error' ? 'warning' : 'success';

        // Asignar las oraciones generadas a la variable
        generatedSentences.value = response.data.sentences;

      } catch (error) {
        console.error('Error checking spelling:', error);
        alertMessage.value = 'Error checking spelling.';
        alertType.value = 'error';
      }
    };

    const saveSentence = (index) => {
      console.log(`Sentence at index ${index} saved:`, generatedSentences.value[index]);
      // Aquí podrías hacer una llamada para guardar la oración editada en la base de datos
    };

    return { selectedLanguage, multipleValues, languages, tokens, selectedNumTokens, submitForm, alertMessage, alertType, generatedSentences, saveSentence };
  }
};
</script>

<style scoped>
/* Añade estilos personalizados si es necesario */
</style>
