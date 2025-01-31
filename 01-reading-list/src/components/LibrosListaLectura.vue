<template>
  <section>
    <div id="favoritos">
      <h2>Lista de Lectura</h2>
      <p v-if="favoritos.length === 0">No hay libros en la lista de lectura.</p>
      <ul v-else>
        <li v-for="libro in favoritos" :key="libro.book.ISBN" >
          <img class="card" :src="libro.book.cover" :alt="libro.book.title" @click="eliminar(libro)">
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
  padding: 20%;
  margin-top: 10%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: left;
  gap: 10px;
}

.card {
  margin-top: 12px;
  float: left;
  padding: 15px;
  width: 250px;
  height: 300px;
  background: rgb(223, 225, 235);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, 
              rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, 
              rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, 
              rgba(0, 0, 0, 0.06) 0px 2px 1px, 
              rgba(0, 0, 0, 0.09) 0px 4px 2px, 
              rgba(0, 0, 0, 0.09) 0px 8px 4px, 
              rgba(0, 0, 0, 0.09) 0px 16px 8px, 
              rgba(0, 0, 0, 0.09) 0px 32px 16px;
  transition: all 0.3s ease-in-out; /* Suaviza la transición */
}

.card:hover {
  box-shadow: 0 0 10px 3px rgba(0, 255, 0, 0.75),  /* Efecto de neón verde */
              0 0 20px 5px rgba(0, 255, 0, 0.75), /* Resplandor más grande */
              0 0 30px 10px rgba(0, 255, 0, 0.75); /* Resplandor extra */
  transform: scale(1.05); /* Agrandar un poco la tarjeta */
}

.card h2, .card p {
  transition: all 0.3s ease-in-out;
}

.card:hover h2, .card:hover p {
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.75), 
               0 0 10px rgba(0, 255, 0, 0.75), 
               0 0 15px rgba(0, 255, 0, 0.75); /* Efecto neón en texto */
}
</style>
