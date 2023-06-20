import { shallowMount, mount } from "@vue/test-utils"
import PokemonPage from "@/pages/PokemonPage"
import { pokemons } from "../mocks/pokemon.mock"
import PokemonPicture from "@/components/PokemonPicture"
import PokemonOptions from "@/components/PokemonOptions"
import getPokemonsOptions from "@/helpers/getPokemonOptions"


describe('PokemonPage component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })

  test('', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Debe llamar a el metod mixedPokemons', () => {
    const mixedPokemonsSpy = jest.spyOn(PokemonPage.methods, 'mixedPokemons')
    wrapper = shallowMount(PokemonPage)
    //console.log(mixedPokemonsSpy)
    expect(mixedPokemonsSpy).toHaveBeenCalled()
  })

  test('debe hacer match con data',()=>{
    // Lo monta en el shapshot sutilmente con stub
    const wrapper = shallowMount(PokemonPage, {
      data() {
       return{
        pokemonArr: pokemons,
        pokemon: pokemons[0],
        showPokemon: false,
        showAnswer: false,
        message: null,
       }
      }
    })

    // lo monta y renderiza los componentes 
    /* const wrapper = mount(PokemonPage, {
      data() {
       return{
        pokemonArr: pokemons,
        pokemon: pokemons[0],
        showPokemon: false,
        showAnswer: false,
        message: null,
       }
      }
    }) */


    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Debe mostrar el los componentes PokemonPicture y PokemonOptions', async () => {


    const wrapper = shallowMount(PokemonPage,{
      data(){
        return{
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        }
      }
    })
    // Mi resuesta a la tarea
    // PokemonPicture debe existir sin importar el componente hijo
    const pokemonPicture = wrapper.findComponent({name: 'PokemonPicture'});

    // PokemonOptions debe existir Impotando el componente hijo
    const pokemonOptions = wrapper.findComponent(PokemonOptions);

    //console.log(pokemonPicture)
    expect(pokemonPicture.exists()).toBe(true)
    expect(pokemonOptions.exists()).toBe(true)

    //PokemonPicture debe tener el atributo de pokemonId = 1
    expect(pokemonPicture.attributes('pokemonid')).toBe('1')

    // PokemonOptions debe tenet el atributo de pokemons
    expect(pokemonOptions.props().hasOwnProperty('pokemons')).toBe(true)


    // 2 opcion La del profesor
    const picture = wrapper.find('pokemon-picture-stub')
    const options = wrapper.find('pokemon-options-stub')

    expect(picture.exists()).toBe(true)
    expect(options.exists()).toBe(true)

    expect(picture.attributes('pokemonid')).toBe('1')
    expect(options.attributes('pokemons')).toBeTruthy()
  })

  test('Se debe evaluar en checkAnswer', async() => {
    const wrapper = shallowMount(PokemonPage,{
      data(){
        return{
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        }
      }
    })

    await wrapper.vm.checkAnswer(1)

    expect(wrapper.find('h2').exists()).toBe(true)
    //console.log(wrapper.find('h2').text())

    expect(wrapper.vm.showPokemon).toBeTruthy()
    expect(wrapper.find('h2').text()).toBe(`Correcto, este es el Pokemon ${pokemons[0].name}`)

    //tarea que salga el mensaje negativo cuando sera error
    await wrapper.vm.checkAnswer(5)

    expect(wrapper.vm.message).toBe(`Oops, el Pokemon era ${pokemons[0].name}`)
  })  


})