<template>
  <section>
    <div id="favoritos">
      <h2>Lista de Lectura</h2>
      <p v-if="favoritos.length === 0">No hay libros en la lista de lectura.</p>
      <ul v-else>
        <li v-for="libro in favoritos" :key="libro.book.ISBN" >
          <img :src="libro.book.cover" :alt="libro.book.title" @click="eliminar(libro)">
          <p>{{ libro.book.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>

import { defineProps,ref,defineEmits } from 'vue';

const emit = defineEmits(["eliminarLectura"])


  const eliminar = (libro) =>{

    emit("eliminarLectura",libro)

  }


defineProps({
  favoritos: Array
});
</script>

<style scoped>
#favoritos {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
}

img {
  width: 50px;
  height: auto;
  border-radius: 5px;
}
</style>
