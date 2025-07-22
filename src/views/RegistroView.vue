<script setup>
import { ref, computed } from 'vue';

// variables para los campos
const nombre = ref('');
const correo = ref('');
const password = ref('');
const repitePassword = ref('');

// variables para los errores
const errorCorreo = ref('');
const errorPassword = ref('');
const formEnviado = ref(false); // para saber si el usuario ya intentó enviar

// --- funciones de Validación  ---

// función para validar el formato del correo electronico
const validarCorreo = () => {
  if (correo.value === '') {
    errorCorreo.value = 'El campo correo es requerido.';
    return;
  }
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo.value)) {
    errorCorreo.value = 'El formato del correo no es válido.';
  } else {
    errorCorreo.value = '';
  }
};

// validar la contraseña en tiempo real
const errorCoincidenciaPassword = computed(() => {
  if (password.value && repitePassword.value) {
    return password.value === repitePassword.value ? '' : 'Las contraseñas no coinciden.';
  }
  return '';
});

// verificar si un campo esta vacio
const campoVacio = (valor) => {
  return formEnviado.value && valor === '';
};

// se ejecuta al presionar el boton de enviar
const registrar = () => {
  formEnviado.value = true;
  
  // revalidamos el correo al intentar enviar
  validarCorreo();

  // se verifican todas las condiciones
  if (
    nombre.value !== '' &&
    correo.value !== '' &&
    password.value !== '' &&
    repitePassword.value !== '' &&
    !errorCorreo.value &&
    !errorCoincidenciaPassword.value
  ) {
    // si todo está correcto
    alert('El registro se ha realizado correctamente');
    
    // limpiar el formulario después del registro por comodidad, hacer tambien en notas pero pensar primero la logica
    nombre.value = '';
    correo.value = '';
    password.value = '';
    repitePassword.value = '';
    formEnviado.value = false;
  }
};
</script>

<template>
  <div class="registro-container">
    <h1 class="mb-4">Formulario de Registro</h1>
    <form @submit.prevent="registrar" class="registro-form" novalidate>
      
      <!-- campo nombre -->
      <div class="form-group">
        <input type="text" class="form-control" v-model="nombre" placeholder="Nombre:">
        <div v-if="campoVacio(nombre)" class="invalid-feedback">El campo nombre es requerido.</div>
      </div>
      
      <!-- campo correo -->
      <div class="form-group">
        <input type="email" class="form-control" v-model="correo" placeholder="Correo:" @blur="validarCorreo">
        <div v-if="errorCorreo" class="invalid-feedback">{{ errorCorreo }}</div>
      </div>
      
      <!-- campo contraseña -->
      <div class="form-group">
        <input type="password" class="form-control" v-model="password" placeholder="Contraseña:">
         <div v-if="campoVacio(password)" class="invalid-feedback">El campo contraseña es requerido.</div>
      </div>
      
      <!-- campo repetir contraseña -->
      <div class="form-group">
        <input type="password" class="form-control" v-model="repitePassword" placeholder="Repetir Contraseña:">
        <div v-if="errorCoincidenciaPassword" class="invalid-feedback">{{ errorCoincidenciaPassword }}</div>
      </div>
      
      <button type="submit" class="btn btn-success">Enviar</button>
    </form>
  </div>
</template>

<style scoped>
.registro-container {
  max-width: 450px;
  margin: auto;
  padding-top: 2rem;
  text-align: center;
}

.registro-form .form-group {
  margin-bottom: 1.5rem;
}

.registro-form .form-control {
  text-align: left; /* para que el texto dentro empiece a la izquierda */
  padding-left: 1rem;
}

/* estilos del error */
.invalid-feedback {
  color: #dc3545;
  display: block;
  text-align: center;
  margin-top: .5rem;
}

.registro-form .btn {
  width: 150px;
}
</style>