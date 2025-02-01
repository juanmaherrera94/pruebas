import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LibroComponent from '@/components/LibroComponent.vue'

describe('LibroComponent.vue', () => {
  const librosMock = [
    { book: { ISBN: '123', title: 'Libro 1', genre: 'Fantasía', pages: 200, cover: 'cover1.jpg' } },
    { book: { ISBN: '456', title: 'Libro 2', genre: 'Zombies', pages: 300, cover: 'cover2.jpg' } }
  ]
  const favoritosMock = [
    { book: { ISBN: '123', title: 'Libro 1', genre: 'Fantasía', pages: 200, cover: 'cover1.jpg' } }
  ]

  it('muestra correctamente el número de libros y favoritos', () => {
    const wrapper = mount(LibroComponent, {
      props: {
        libros: librosMock,
        favoritos: favoritosMock
      }
    })

    expect(wrapper.text()).toContain('2 libros disponibles')
    expect(wrapper.text()).toContain('1 en la lista de lectura')
  })

  it('filtra los libros por género', async () => {
    const wrapper = mount(LibroComponent, {
      props: { libros: librosMock, favoritos: [] }
    })

    const select = wrapper.find('select')
    await select.setValue('Fantasía')

    expect(wrapper.vm.librosFiltrados.length).toBe(1)
    expect(wrapper.vm.librosFiltrados[0].book.genre).toBe('Fantasía')
  })

  it('filtra los libros por páginas', async () => {
    const wrapper = mount(LibroComponent, {
      props: { libros: librosMock, favoritos: [] }
    })

    const input = wrapper.find('input')
    await input.setValue('300')

    expect(wrapper.vm.librosFiltrados.length).toBe(1)
    expect(wrapper.vm.librosFiltrados[0].book.pages).toBe(300)
  })

  it('emite el evento "agregarLectura" cuando se hace clic en un libro', async () => {
    const wrapper = mount(LibroComponent, {
      props: { libros: librosMock, favoritos: [] }
    })

    const emitSpy = vi.spyOn(wrapper.vm, '$emit')

    const img = wrapper.find('img')
    await img.trigger('click')

    expect(emitSpy).toHaveBeenCalledWith('agregarLectura', librosMock[0])
  })
})
