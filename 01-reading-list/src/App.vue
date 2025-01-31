<template>
    <LibrosDisponibles :libros="libros" :favoritos="favoritos" @agregarLectura="agregarLectura"/>
    <LibrosListaLectura :favoritos="favoritos" @eliminarLectura="eliminarLectura"/>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import books from "./components/books.json";
  import LibrosDisponibles from "./components/LibrosDisponibles.vue"
  import LibrosListaLectura from "./components/LibrosListaLectura.vue"
  
  const libros = ref(books.library)
  const favoritos = ref([])
  
  // Cargar datos desde localStorage cuando se monta el componente
  onMounted(() => {
    const librosGuardados = JSON.parse(localStorage.getItem('libros'))
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos'))
  
    if (librosGuardados) {
      libros.value = librosGuardados
    }
    if (favoritosGuardados) {
      favoritos.value = favoritosGuardados
    }
  })
  
  // Guardar los datos en localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('libros', JSON.stringify(libros.value))
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }
  
  // Agregar libro a la lista de lectura
  const agregarLectura = (libro) => {
    if (!favoritos.value.find(fav => fav.book.ISBN === libro.book.ISBN)) {
      favoritos.value.push(libro)
      libros.value = libros.value.filter(fav => fav.book.ISBN !== libro.book.ISBN)
      saveToLocalStorage()  // Guardar en localStorage
    }
  }
  
  // Eliminar libro de la lista de lectura
  const eliminarLectura = (libro) => {
    if (!libros.value.find(fav => fav.book.ISBN === libro.book.ISBN)) {
      libros.value.push(libro)
    }
    favoritos.value = favoritos.value.filter(fav => fav.book.ISBN !== libro.book.ISBN)
    saveToLocalStorage()  // Guardar en localStorage
  }
  </script>
  
  <style scoped></style>
  