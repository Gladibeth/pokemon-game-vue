import pokemonApi from "@/api/pokemonApi"

export const getPokemons = () => {
    const pokemonArr = Array.from(Array(650))
  
    return pokemonArr.map((_, i) => i +  1)
  }


  const getPokemonsOptions = async() => {
    const mixedPokemons = getPokemons().sort(()=> Math.random() - 0.5);
    //console.log(mixedPokemons);
    const pokemons = await getPokemonsNames(mixedPokemons.splice(0, 4))

    //console.table(pokemons)
    return pokemons
  }

  export const getPokemonsNames = async ([a,b,c,d] = []) => {

    /* const res = await pokemonApi.get(`/45`)
    console.log(res.data.name)
    console.log(a,b,c,d); */
    
    const promiseArr = [
      pokemonApi.get(`/${a}`),
      pokemonApi.get(`/${b}`),
      pokemonApi.get(`/${c}`),
      pokemonApi.get(`/${d}`),
    ]

    const [p1,p2,p3,p4 ] = await Promise.all(promiseArr)
    
    return [
      {
        name: p1.data.name,
        id: p1.data.id,
      },
      {
        name: p2.data.name,
        id: p2.data.id,
      },
      {
        name: p3.data.name,
        id: p3.data.id,
      },
      {
        name: p4.data.name,
        id: p4.data.id,
      }
    ]
    
  }
  export default getPokemonsOptions