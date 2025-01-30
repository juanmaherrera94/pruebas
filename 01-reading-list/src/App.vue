<template>
<LibrosDisponibles :libros="libros" @agregarLectura="agregarLectura"/>
<LibrosListaLectura :favoritos="favoritos" @eliminarLectura="eliminarLectura"/>
</template>

<script setup>
import { ref } from 'vue'
import books from "./components/books.json";
import LibrosDisponibles from "./components/LibrosDisponibles.vue"
import LibrosListaLectura from "./components/LibrosListaLectura.vue"

const libros = ref(books.library)

const favoritos = ref([])

//Agregar libro a la lista de lectura

const agregarLectura = (libro) =>{

    if (!favoritos.value.find(fav =>fav.book.ISBN === libro.book.ISBN)){
        favoritos.value.push(libro)
       libros.value = libros.value.filter(fav => fav.book.ISBN !== libro.book.ISBN)
    }
}

// eliminar libro de lectura
const eliminarLectura = (libro) =>{
    if (!libros.value.find(fav =>fav.book.ISBN === libro.book.ISBN)){
        libros.value.push(libro)
    }
    favoritos.value = favoritos.value.filter(fav => fav.book.ISBN !== libro.book.ISBN)
}



</script>


<style scoped>

</style>