<script setup>
import { ref, watch } from 'vue'

// vsriables para los campos del formulario
const nota1 = ref(null)
const nota2 = ref(null)
const nota3 = ref(null)
const asistencia = ref(null)

// para los mensajes de error de cada campo
const errorNota1 = ref('')
const errorNota2 = ref('')
const errorNota3 = ref('')
const errorAsistencia = ref('')

// para mostrar el resultado final
const promedio = ref(null)
const estado = ref('')

// --- watch para validar en tiempo real ---

watch(nota1, (newVal) => {
  promedio.value = null // esto resetea el resultado si se cambia una nota
  if (newVal < 10 || newVal > 70) {
    errorNota1.value = 'El valor debe estar entre 10 y 70.'
  } else {
    errorNota1.value = ''
  }
})

watch(nota2, (newVal) => {
  promedio.value = null
  if (newVal < 10 || newVal > 70) {
    errorNota2.value = 'El valor debe estar entre 10 y 70.'
  } else {
    errorNota2.value = ''
  }
})

watch(nota3, (newVal) => {
  promedio.value = null
  if (newVal < 10 || newVal > 70) {
    errorNota3.value = 'El valor debe estar entre 10 y 70.'
  } else {
    errorNota3.value = ''
  }
})

watch(asistencia, (newVal) => {
  promedio.value = null
  if (newVal < 0 || newVal > 100) {
    errorAsistencia.value = 'El valor debe estar entre 0 y 100.'
  } else {
    errorAsistencia.value = ''
  }
})

// se ejecuta al presionar el botón
const calcular = () => {
  // 1 verifica si hay algún error activo
  if (errorNota1.value || errorNota2.value || errorNota3.value || errorAsistencia.value) {
    return // no calcula si hay errores
  }

  // 2 verifica si algún campo está vacio
  if (!nota1.value || !nota2.value || !nota3.value || !asistencia.value) {
    return // no calcula si hay campos vacios
  }

  // calculo del promedio ponderado
  const promedioCalculado = nota1.value * 0.35 + nota2.value * 0.35 + nota3.value * 0.3
  promedio.value = promedioCalculado.toFixed(2)

  // verifica  las condiciones para aprobar
  if (promedio.value >= 40 && asistencia.value >= 80) {
    estado.value = 'Aprobado'
  } else {
    estado.value = 'Reprobado'
  }
}
</script>

<template>
  <div class="calculo-container">
    <form @submit.prevent="calcular" class="calculo-form">
      <!-- nota 1 con su mensaje de error -->
      <div class="form-group">
        <label for="nota1">Nota 1</label>
        <input
          type="number"
          id="nota1"
          class="form-control"
          v-model.number="nota1"
          :class="{ 'is-invalid': errorNota1 }"
        />
        <div v-if="errorNota1" class="invalid-feedback">{{ errorNota1 }}</div>
      </div>

      <!-- nota 2 con su mensaje de error -->
      <div class="form-group">
        <label for="nota2">Nota 2</label>
        <input
          type="number"
          id="nota2"
          class="form-control"
          v-model.number="nota2"
          :class="{ 'is-invalid': errorNota2 }"
        />
        <div v-if="errorNota2" class="invalid-feedback">{{ errorNota2 }}</div>
      </div>

      <!-- nota 3 con su mensaje de error -->
      <div class="form-group">
        <label for="nota3">Nota 3</label>
        <input
          type="number"
          id="nota3"
          class="form-control"
          v-model.number="nota3"
          :class="{ 'is-invalid': errorNota3 }"
        />
        <div v-if="errorNota3" class="invalid-feedback">{{ errorNota3 }}</div>
      </div>

      <!-- asistencia con su mensaje de error -->
      <div class="form-group">
        <label for="asistencia">Asistencia %</label>
        <input
          type="number"
          id="asistencia"
          class="form-control"
          v-model.number="asistencia"
          :class="{ 'is-invalid': errorAsistencia }"
        />
        <div v-if="errorAsistencia" class="invalid-feedback">{{ errorAsistencia }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Calcular</button>
    </form>

    <!-- resultados -->
    <div v-if="promedio" class="resultado-container mt-4">
      <p>El promedio es: {{ promedio }}</p>
      <p>
        Tu estado es: <span :class="estado.toLowerCase()">{{ estado }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.calculo-container {
  max-width: 500px;
  margin: auto;
  padding-top: 2rem;
}

.calculo-form .form-group {
  margin-bottom: 1rem; /* pequeño para que el error quede más cerca */
  text-align: center;
  position: relative;
}

.calculo-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.calculo-form .form-control {
  max-width: 300px;
  margin: 0 auto;
}

/* Estilo de Bootstrap */
.is-invalid {
  border-color: #dc3545;
}
.invalid-feedback {
  color: #dc3545;
  display: block; /* para que siempre visible cuando la cundicion es true */
  text-align: center;
  margin-top: 0.25rem;
}

.calculo-form .btn {
  display: block;
  margin: 2rem auto 0;
  width: 150px;
}

.resultado-container {
  text-align: center;
  font-size: 1.1rem;
}

.aprobado {
  color: #198754;
  font-weight: bold;
}

.reprobado {
  color: #dc3545;
  font-weight: bold;
}
</style>
