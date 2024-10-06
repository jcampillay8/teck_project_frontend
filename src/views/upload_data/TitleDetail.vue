<template>
  <v-row>
    <!-- Columna vacía a la izquierda -->
    <v-col cols="12" md="2"></v-col>

    <!-- Columna principal donde se mostrará la oración, textarea y botones -->
    <v-col cols="12" md="8">
      <h1>{{ title.Title_Name }}</h1>
      <p><strong>Language:</strong> {{ title.Language }}</p>
      <p><strong>Level CEFR:</strong> {{ title.Level_CEFR }}</p>
      <p><strong>Description:</strong> {{ title.Description }}</p>

      <!-- Mostrar la oración actual -->
      <div v-if="currentSentence">
        <h2>{{ title.Language === 'Spanish' ? 'Spanish Sentence' : 'English Sentence' }}</h2>
        <p>{{ currentSentence.Sentence }}</p>
        <p><strong>Rating:</strong> {{ currentSentence.rating_sentence || 'No rating yet' }}</p>
        <p><strong>Votes:</strong> {{ currentSentence.number_votes_sentence }}</p>
      </div>

      <!-- Textarea para que el usuario escriba su respuesta o comentarios -->
      <v-textarea
        v-model="userInput"
        label="Write your translation here"
        outlined
        rows="5"
        placeholder="Type something..."
      ></v-textarea>

      <!-- Botones para "NEXT" y "CHECK ANSWER" -->
      <v-row class="mt-3">
        <v-col>
          <v-btn color="#f66b37" dark @click="nextRandomSentence">NEXT</v-btn>
          <v-btn color="#00aaff" dark @click="checkAnswer">CHECK ANSWER</v-btn>
        </v-col>
      </v-row>

      <!-- Mostrar feedback del "CHECK ANSWER" -->
      <div v-if="feedback">
        <h3>Feedback</h3>
        <p>{{ feedback }}</p>
      </div>

      <!-- Mostrar el resultado con diferencias resaltadas -->
      <div v-if="highlighted_diff">
        <h3>Corrections</h3>
        <p v-html="highlighted_diff"></p> <!-- Mostrar el HTML con las diferencias resaltadas -->
      </div>
    </v-col>

    <!-- Columna vacía a la derecha -->
    <v-col cols="12" md="2"></v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: {
        Title_Name: '',
        Language: '',
        Level_CEFR: '',
        Description: '',
        spanish_sentences: [],
        english_sentences: []
      },
      currentSentence: null, // Oración actual
      errorMessage: '',
      userInput: '', // Texto ingresado por el usuario en el TextArea
      feedback: '', // Feedback después de chequear la respuesta
      highlighted_diff: '' // Almacenar la respuesta con el HTML resaltado
    };
  },
  methods: {
    fetchTitleDetails() {
      const id = this.$route.params.id;
      axios
        .get(`http://localhost:8000/skill_practice/practice/${id}/`)  // Comillas invertidas para interpolar la variable `id`
        .then((response) => {
          this.title = response.data;
          this.nextRandomSentence(); // Seleccionar una oración aleatoria al cargar la página
        })
        .catch((error) => {
          this.errorMessage = 'Error fetching title details: ' + (error.response || error.message || error);
          console.error(this.errorMessage);
        });
    },
    // Método para obtener una oración aleatoria
    nextRandomSentence() {
      let sentences = [];

      if (this.title.Language === 'Spanish') {
        sentences = this.title.spanish_sentences;
      } else if (this.title.Language === 'English') {
        sentences = this.title.english_sentences;
      }

      if (sentences.length > 0) {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        this.currentSentence = sentences[randomIndex];
      } else {
        this.currentSentence = null;
      }

      // Limpiar el contenido del TextArea, feedback y correcciones
      this.userInput = '';  // Limpiar TextArea
      this.feedback = '';   // Limpiar feedback
      this.highlighted_diff = ''; // Limpiar correcciones resaltadas
    },
    // Método para chequear la respuesta del usuario con OpenAI
    checkAnswer() {
      const requestData = {
        sentence: this.currentSentence.Sentence,
        user_answer: this.userInput,
        language: this.title.Language
      };

      axios
        .post('http://localhost:8000/skill_practice/check_answer/', requestData)
        .then((response) => {
          this.feedback = response.data.feedback;
          this.highlighted_diff = response.data.highlighted_diff;  // Guardar el highlighted_diff para mostrarlo con v-html
        })
        .catch((error) => {
          console.error('Error checking answer:', error);
          this.feedback = 'Error processing your answer. Please try again.';
        });
    }
  },
  mounted() {
    this.fetchTitleDetails();
  }
};
</script>
