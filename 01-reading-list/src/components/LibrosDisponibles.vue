<template >
    <section>
        <div>
            <h2>{{numeroLibros}} libros disponibles</h2>
            <p>en la lista de lectura</p>
            <p>Filtrar por pagina</p>
            <input type="text" id="paginas"><button id="enviar">Buscar</button>
            <select v-model="generoSeleccionado">
                <option value="">Todos</option>
                <option value="Fantasía">Fantasia</option>
                <option value="Zombies">Zombies</option>
                <option value="Ciencia ficción">Ciencia Ficcion</option>
                <option value="Terror">Terror</option>
            </select>
            
            <div v-for="libro in librosFiltrados" :key="libro.book.ISBN">
                <img class="card" :src="libro.book.cover" :alt="libro.book.title" @click="agregar(libro)">
            </div>
        </div>

    </section>

</template>

<script setup>

import { defineProps,ref,defineEmits,computed } from 'vue'

const props = defineProps({
    libros: Array,
    require: true
});



const generoSeleccionado = ref("");

// Computed para contar los libros disponibles
const numeroLibros = computed(() => librosFiltrados.value.length)

// Computed para filtrar libros por genero
const librosFiltrados = computed(() => {
    if (!generoSeleccionado.value) {
        return props.libros; // Si no se selecciona un genero, mostrar todos los libros
    }
    return props.libros.filter(libro => libro.book.genre === generoSeleccionado.value);
});


const emit = defineEmits(["agregarLectura"])
const agregar = (libro) =>{

    emit("agregarLectura",libro)
}



</script>
<style scoped>

.card {
  margin-top: 12px;
  float: left;
  padding: 15px;
  width: 300px;
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

}
</style>