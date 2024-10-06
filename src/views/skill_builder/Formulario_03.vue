<template>
  <v-row justify="center">
    <!-- Columna vacía a la izquierda -->
    <v-col cols="12" md="1"></v-col>

    <!-- Columna principal con el formulario -->
    <v-col cols="12" md="10">
      <h1>Create New Skill - Formulario 03</h1>
      <v-form>
        <!-- Seleccionador de lenguajes -->
        <v-select
          :label="$t('skill_builder.Select_Language')" 
          :items="languages"
          v-model="selectedLanguage"
          filterable
          item-text="language"
          item-value="language"
          class="mt-4"
        ></v-select>

        <!-- Campo de texto para el nombre de la habilidad -->
        <v-text-field :label="$t('skill_builder.Title_Name')" v-model="skillName"></v-text-field>

        <!-- Segundo dropdown (Topic Father) -->
        <v-select
          :label="$t('skill_builder.Topic_Father')"
          :items="topicFathers"
          v-model="selectedTopicFather"
          filterable
        ></v-select>

        <!-- Campo de texto para ingresar múltiples valores -->
        <v-text-field
          :label="$t('skill_builder.Enter_multiple_topic_son')"
          v-model="multipleValues"
          :hint="$t('skill_builder.Use_commas_to_separate_values')"
          persistent-hint
        ></v-text-field>

        <v-textarea
          :label="$t('skill_builder.Description')"
          v-model="skillDescription"
          rows="4"
          outlined
          class="mt-4"
        ></v-textarea>

        <!-- Primer dropdown (CEFR Level) -->
        <v-select
          :label="$t('skill_builder.CEFR_Level')"
          :items="cefr_levels"
          v-model="selectedCEFRLevel"
        ></v-select>

        <v-select
          :label="$t('skill_builder.Select_number_tokens')"
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

        <!-- Botón de envío, desaparece si aparece la tabla -->
        <v-btn v-if="!generatedSentences.length" color="primary" @click="submitForm">
          {{ $t('skill_builder.Submit') }}
        </v-btn>

        <!-- Botón de continuar y resubmit, desaparecen cuando se generan las oraciones -->
        <v-row v-if="showContinueButton && !generatedSentences.length" class="mt-4">
          <v-col>
            <v-btn color="success" @click="continueAction">{{ $t('skill_builder.Continue') }}</v-btn>
          </v-col>
          <v-col>
            <v-btn color="warning" @click="submitForm">{{ $t('skill_builder.Resubmit') }}</v-btn>
          </v-col>
        </v-row>

        <!-- Tabla editable con las oraciones generadas -->
        <v-table v-if="generatedSentences.length > 0" class="mt-4">
          <thead>
            <tr>
              <th>{{ $t('skill_builder.Setence') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sentence, index) in generatedSentences" :key="index">
              <td>
                <v-confirm-edit v-model="generatedSentences[index]">
                  <template v-slot:default="{ model: proxyModel, actions }">
                    <v-card class="mx-auto" max-width="1600">
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

        <!-- Botón para guardar las oraciones, aparece junto con la tabla -->
        <v-btn v-if="generatedSentences.length > 0" color="primary" @click="saveSentences">
          {{ $t('skill_builder.Save_Sentences') }}
        </v-btn>
      </v-form>
    </v-col>

    <!-- Columna vacía a la derecha -->
    <v-col cols="12" md="1"></v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t, locale } = useI18n();

    const skillName = ref('');
    const skillDescription = ref('');
    const selectedCEFRLevel = ref(null);
    const selectedTopicFather = ref(null);
    const cefr_levels = ref([]);
    const topicFathers = ref([]);
    const selectedLanguage = ref('');
    const multipleValues = ref('');
    const selectedNumTokens = ref(100);
    const languages = ref(['English', 'Spanish', 'French', 'Japanese', 'German', 'Chinese']);
    const tokens = ref([100, 250, 500, 750, 1000]);
    const alertMessage = ref('');
    const alertType = ref('error');
    const generatedSentences = ref([]);
    const showContinueButton = ref(false);

    const loadTopicFathers = () => {
      const languageCode = locale.value.split('-')[0];
      axios
        .get('http://localhost:8000/skill_builder/topics/', { params: { language: languageCode } })
        .then(response => {
          topicFathers.value = response.data.map(topic => Object.values(topic)[0]);
        })
        .catch(error => console.error('Error loading topic fathers:', error));
    };

    onMounted(() => {
      cefr_levels.value = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      loadTopicFathers();
    });

    watch(locale, loadTopicFathers);

    const submitForm = async () => {
      if (!selectedLanguage.value || !multipleValues.value || !selectedNumTokens.value) {
        alertMessage.value = t('skill_builder.errors.fill_required_fields');
        alertType.value = 'error';
        return;
      }

      const words = multipleValues.value.split(',').map(word => word.trim()).filter(word => word);

      try {
        const params = new URLSearchParams();
        params.append('language', selectedLanguage.value);
        words.forEach(word => {
          params.append('words[]', word);
        });
        params.append('num_tokens', selectedNumTokens.value);
        params.append('topic_father', selectedTopicFather.value);
        params.append('description', skillDescription.value);
        params.append('cefr_level', selectedCEFRLevel.value);

        const response = await axios.get('http://localhost:8000/skill_builder/check_spelling/', {
          params: params,
        });

        alertMessage.value =
          response.data.status === 'error'
            ? t('skill_builder.errors.misspelled_words', { words: response.data.message })
            : t('success.sentences_generated');
        alertType.value = response.data.status === 'error' ? 'warning' : 'success';

        if (response.data.status === 'success') {
          generatedSentences.value = response.data.sentences;
        }

        showContinueButton.value = true;
      } catch (error) {
        console.error('Error checking spelling:', error);
        alertMessage.value = t('skill_builder.errors.spell_check_failed');
        alertType.value = 'error';
      }
    };

    const continueAction = async () => {
      try {
        const params = new URLSearchParams();
        params.append('language', selectedLanguage.value);
        multipleValues.value
          .split(',')
          .map(word => word.trim())
          .forEach(word => {
            params.append('words[]', word);
          });
        params.append('num_tokens', selectedNumTokens.value);
        params.append('topic_father', selectedTopicFather.value);
        params.append('description', skillDescription.value);
        params.append('cefr_level', selectedCEFRLevel.value);
        params.append('skip_spell_check', 'true');

        const response = await axios.get('http://localhost:8000/skill_builder/check_spelling/', {
          params: params,
        });

        alertMessage.value = t('skill_builder.success.sentences_generated');
        alertType.value = 'success';
        generatedSentences.value = response.data.sentences;
      } catch (error) {
        console.error('Error omitting spell checking:', error);
        alertMessage.value = t('skill_builder.errors.omit_spell_check_failed');
        alertType.value = 'error';
      }
    };

    const saveSentences = () => {
      const payload = {
        Title_Name: skillName.value,
        Language: selectedLanguage.value,
        Topic_Father: selectedTopicFather.value,
        Topic_Son: multipleValues.value,
        Description: skillDescription.value,
        Level_CEFR: selectedCEFRLevel.value,
        number_setence: generatedSentences.value.length,
        spanish_sentences: generatedSentences.value.map(sentence => ({ Sentence: sentence })),
        english_sentences: generatedSentences.value.map(sentence => ({ Sentence: sentence })),
      };

      // Imprime el payload para depurar
      console.log("Payload enviado:", payload);

      axios
        .post('http://localhost:8000/skill_builder/save_sentences/', payload)
        .then(response => {
          alertMessage.value = 'Sentences saved successfully!';
          alertType.value = 'success';
        })
        .catch(error => {
          console.error('Error saving sentences:', error);
          alertMessage.value = 'Error saving sentences. Please try again.';
          alertType.value = 'error';
        });
    };


    return {
      skillName,
      skillDescription,
      selectedCEFRLevel,
      selectedTopicFather,
      cefr_levels,
      topicFathers,
      selectedLanguage,
      multipleValues,
      languages,
      tokens,
      selectedNumTokens,
      submitForm,
      alertMessage,
      alertType,
      generatedSentences,
      saveSentences,
      showContinueButton,
      continueAction,
    };
  },
};
</script>

<style scoped>
.wrapped-text {
  word-wrap: break-word;
  white-space: normal;
}
</style>
