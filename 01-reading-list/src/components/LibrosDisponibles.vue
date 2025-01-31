<template >
    <section>
        <div>
            <h2>{{numeroLibros}} libros disponibles</h2>
            <p>{{numeroLibrosFav}} en la lista de lectura</p>
            <p>Filtrar por pagina</p>
            <input type="text"  v-model="porPaginas">
            <br>
            <br>
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

import { defineProps,ref,defineEmits,computed,onMounted } from 'vue'

const props = defineProps({
    libros: Array,
    favoritos: Array
});

// Computed para contar los libros en la lista de lectura
const numeroLibrosFav = computed(() => props.favoritos.length); // 

const generoSeleccionado = ref("");
const porPaginas = ref("");

// Computed para contar los libros disponibles
const numeroLibros = computed(() => librosFiltrados.value.length)

// Computed para filtrar libros por genero y por pagina
const librosFiltrados = computed(() => {
    const paginas = parseInt(porPaginas.value); // Convertimos a número

    return props.libros.filter(libro => {
        const cumpleGenero = !generoSeleccionado.value || libro.book.genre === generoSeleccionado.value;
        const cumplePaginas = isNaN(paginas) || libro.book.pages === paginas; // Verificamos que páginas sea válido
        return cumpleGenero && cumplePaginas;
    });
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