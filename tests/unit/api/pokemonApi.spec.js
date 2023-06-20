import pokemonApi from "@/api/pokemonApi.js"

describe("pokemonApi",() => {
  test("Validar que la peticion a axios se haga correctamente", () => {
    expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
  })
})