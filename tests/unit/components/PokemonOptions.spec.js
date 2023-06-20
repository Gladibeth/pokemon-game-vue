import { shallowMount } from "@vue/test-utils"
import PokemonOptions from "@/components/PokemonOptions"
import { pokemons } from "../mocks/pokemon.mock"

describe('PokemonOptions component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions,{
      props:{
        pokemons
      }
    })
  })
  test('Debe hacer match con el shapshot', () => {
    

    expect(wrapper.html()).toMatchSnapshot()
  })


  test('debe tener 4 li con sus respectivos nombres', () => {
    const list = wrapper.findAll('li')
    const [a, b, c, d] = list;
    //console.log(list.length)
    //console.log(a.text())
    expect(list.length).toBe(4)

    expect(a.text()).toBe('bulbasaur')
    expect(b.text()).toBe('ivysaur')
    expect(c.text()).toBe('venusaur')
    expect(d.text()).toBe('charmander')


  })

  test('Debe emitir el "Selection"', ()=>{
    const [li1,li2,li3,li4] = wrapper.findAll('li');

    li1.trigger('click')
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')

    //console.log(wrapper.emitted('selectionPokemon'))
    expect(wrapper.emitted('selectionPokemon').length).toBe(4)
    expect(wrapper.emitted('selectionPokemon')[0]).toStrictEqual([1])
    expect(wrapper.emitted('selectionPokemon')[1]).toStrictEqual([2])
    expect(wrapper.emitted('selectionPokemon')[2]).toStrictEqual([3])
    expect(wrapper.emitted('selectionPokemon')[3]).toStrictEqual([4])
  })
})