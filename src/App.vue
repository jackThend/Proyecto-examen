<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Programación Front End</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Cálculo de calificaciones</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/registro">Formulario de Registro</RouterLink>
            </li>
          </ul>
          <!-- barra de búsqueda -->
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Búsqueda</button>
          </form>
        </div>
      </div>
    </nav>

    <main class="container mt-4">
      <RouterView />
    </main>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>