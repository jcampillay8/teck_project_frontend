<template>
    <v-row justify="center">
      <!-- Columna vacía a la izquierda -->
      <v-col cols="12" md="1"></v-col>
  
      <!-- Columna principal con el formulario -->
      <v-col cols="12" md="10">
        <h1>Subir Archivo y Configurar Tabla</h1>
        <v-form ref="fileForm">
          <!-- Campo para cargar archivo -->
          <v-file-input
            label="Seleccione un archivo Excel o CSV"
            v-model="file"
            accept=".xls,.xlsx,.csv"
            prepend-icon="mdi-upload"
            @change="onFileChange"
            required
          ></v-file-input>
  
          <!-- Campo de texto para el nombre de la hoja -->
          <v-text-field
            label="Nombre de la hoja (solo para archivos Excel)"
            v-model="sheetName"
            :disabled="isCSV"
          ></v-text-field>
  
          <!-- Campo para indicar la celda de inicio -->
          <v-text-field
            label="Celda donde inicia la tabla (por ejemplo, A1)"
            v-model="startCell"
            required
          ></v-text-field>
  
          <!-- Botón de envío para cargar y procesar el archivo -->
          <v-btn color="primary" @click="submitForm" :disabled="!file">
            Cargar Archivo
          </v-btn>
  
          <!-- Mensaje de alerta para el resultado de la carga -->
          <v-alert v-if="alertMessage" :type="alertType" class="mt-4">
            {{ alertMessage }}
          </v-alert>
  
          <!-- Mostrar encabezados después de la carga -->
          <div v-if="headers.length" class="mt-4">
            <h2>Seleccione los encabezados que desea conservar y su tipo de valor</h2>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Seleccionar</th>
                  <th>Encabezado</th>
                  <th class="wider-col">Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(header, index) in headers" :key="index">
                  <td>
                    <v-checkbox
                      :value="header"
                      v-model="selectedHeaders"
                      @change="toggleTypeSelect(index)"
                    ></v-checkbox>
                  </td>
                  <td>{{ header }}</td>
                  <td>
                    <v-select
                      :items="dataTypes"
                      v-model="headerTypes[index]"
                      :disabled="!selectedHeaders.includes(header)"
                      label="Seleccione el tipo"
                      dense
                      outlined
                      class="type-dropdown"
                    ></v-select>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
  
            <!-- Campo de texto para ingresar el nombre de la tabla -->
            <v-text-field
              label="Nombre de la nueva tabla"
              v-model="tableName"
              required
            ></v-text-field>
  
            <!-- Botón para confirmar la selección de encabezados -->
            <v-btn color="success" @click="confirmHeaders" :disabled="!selectedHeaders.length || !tableName">
              Confirmar Encabezados
            </v-btn>
          </div>
        </v-form>
      </v-col>
  
      <!-- Columna vacía a la derecha -->
      <v-col cols="12" md="1"></v-col>
    </v-row>
</template>
  
<script>
import axios from '@/axios'; // Importa la instancia configurada que agrega el token.
import { ref } from 'vue';

export default {
  setup() {
    const file = ref(null);
    const sheetName = ref('');
    const startCell = ref('A1');
    const alertMessage = ref('');
    const alertType = ref('error');
    const headers = ref([]);
    const selectedHeaders = ref([]);
    const headerTypes = ref([]);
    const tableName = ref('');
    const isCSV = ref(false);

    // Tipos de datos actualizados con más especificidad para las fechas
    const dataTypes = ref([
      'Id',
      'Texto Corto',
      'Texto Largo',
      'Número Entero',
      'Número con Decimal',
      'Booleano',
      'Lista',
      'Fecha - dd/MM/yyyy',
      'Fecha - MM/dd/yyyy',
      'Fecha - yyyy-MM-dd',
      'Fecha - dd-MM-yyyy',
      'Fecha - MM-yyyy',
      'Fecha - yyyy/MM/dd',
      'Fecha - dd MMMM yyyy',
      'Moneda Peso Chileno ($)',
      'Moneda Dólar USA (US$)',
    ]);

    const onFileChange = (uploadedFile) => {
      if (uploadedFile) {
        isCSV.value = uploadedFile.name.endsWith('.csv');
      }
    };

    const submitForm = async () => {
      if (!file.value) {
        alertMessage.value = 'Por favor, seleccione un archivo para cargar.';
        alertType.value = 'error';
        return;
      }

      // Crear un FormData para enviar el archivo al backend
      const formData = new FormData();
      formData.append('file', file.value);
      if (!isCSV.value) {
        formData.append('sheet_name', sheetName.value);
      }
      formData.append('start_location', startCell.value);

      try {
        // Enviar la solicitud al backend para procesar el archivo
        const response = await axios.post('http://localhost:8000/api/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Mostrar los encabezados para seleccionar
        headers.value = response.data.headers;
        headerTypes.value = new Array(headers.value.length).fill('');
        alertMessage.value = 'Archivo cargado exitosamente. Seleccione los encabezados que desea conservar.';
        alertType.value = 'success';
      } catch (error) {
        console.error('Error al cargar el archivo:', error);
        alertMessage.value = 'Error al cargar el archivo. Por favor, inténtelo de nuevo.';
        alertType.value = 'error';
      }
    };

    const toggleTypeSelect = (index) => {
      // Si se selecciona el checkbox, habilitar el tipo correspondiente
      if (!selectedHeaders.value.includes(headers.value[index])) {
        headerTypes.value[index] = '';
      }
    };

    const confirmHeaders = async () => {
      if (selectedHeaders.value.length === 0) {
        alertMessage.value = 'Por favor, seleccione al menos un encabezado.';
        alertType.value = 'error';
        return;
      }

      // Crear la estructura del payload para enviar al backend
      const payload = {
        selected_columns: selectedHeaders.value.map((header, index) => ({
          name: header,
          type: headerTypes.value[index],
        })),
        table_name: tableName.value,
        file_name: file.value.name, // Obtener el nombre del archivo cargado
        file_sheet: sheetName.value || 'N/A', // Obtener el nombre de la hoja
        start_location: startCell.value, // Obtener la celda de inicio
      };

      try {
        // Enviar solicitud POST al backend para crear la tabla en la base de datos
        await axios.post('http://localhost:8000/api/upload/create-table/', payload);

        alertMessage.value = 'Tabla creada exitosamente en la base de datos.';
        alertType.value = 'success';
      } catch (error) {
        console.error('Error al crear la tabla:', error);
        alertMessage.value = 'Error al crear la tabla. Por favor, inténtelo de nuevo.';
        alertType.value = 'error';
      }
    };

    return {
      file,
      sheetName,
      startCell,
      alertMessage,
      alertType,
      headers,
      selectedHeaders,
      headerTypes,
      tableName,
      isCSV,
      dataTypes,
      onFileChange,
      submitForm,
      toggleTypeSelect,
      confirmHeaders,
    };
  },
};
</script>
  
<style scoped>
.mt-4 {
  margin-top: 1rem;
}
.wider-col {
  width: 300px; /* Hacer la columna de Tipo más ancha */
}
.type-dropdown {
  width: 100%; /* Hacer el dropdown del tipo más ancho */
}
</style>
