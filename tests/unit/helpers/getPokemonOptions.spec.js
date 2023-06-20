import getPokemonOptions, { getPokemons, getPokemonsNames } from "@/helpers/getPokemonOptions"
describe("getPokemonOptions", ()=>{

  test('getPokemon debe retorna una array de 650 elementos ordenados', ()=>{

    const pokemons = getPokemons()
    //console.log(pokemons)

    expect(pokemons.length).toBe(650)
    expect(pokemons[0]).toBe(1)
    expect(pokemons[550]).toBe(551)
    expect(pokemons[649]).toBe(650)
  })

  test('getPokemonName debe retorna un arreglo con cusatro noombres de pokemon', async()=>{
    const pokemonName = await getPokemonsNames([1,2,3,4])

    //console.log(pokemonName);
    expect(pokemonName).toStrictEqual([
      { name: 'bulbasaur', id: 1 },
      { name: 'ivysaur', id: 2 },
      { name: 'venusaur', id: 3 },
      { name: 'charmander', id: 4 }
    ])
  })

  test('getPokemonOptions debe retorna los cuatro pokemones aleatoris', async()=>{
    const pokemonOptions = await getPokemonOptions();

    //console.log(pokemonOptions)
    expect(pokemonOptions.length).toBe(4)
    expect(pokemonOptions).toEqual([
      { 
        name: expect.any(String), 
         id: expect.any(Number) 
        },
      { 
        name: expect.any(String), 
        id: expect.any(Number) 
      },
      { 
        name: expect.any(String), 
        id: expect.any(Number) 
      },
      { 
        name: expect.any(String), 
        id: expect.any(Number) 
      }
    ])
  })
})