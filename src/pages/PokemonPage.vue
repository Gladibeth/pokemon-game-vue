<template>
    <h1 v-if="!pokemon">Por favor espere un momento...</h1>
    <div v-else>
      <h1>Quien es el Pokemon?</h1>
      <!-- Imagen -->
      <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon"/>
      <!-- Opciones -->
      <!--selection-pokemon-->
      <PokemonOptions @selectionPokemon="checkAnswer" :pokemons="pokemonArr"/>

      <template v-if="showAnswer">
        <h2>{{ message }}</h2>
        <button @click="newGame">Nuevo juego</button>
      </template>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';
import getPokemonsOptions from '@/helpers/getPokemonOptions';


export default {
  name: 'PokemonPage',
  components:{
    PokemonPicture,
    PokemonOptions
  },
  data(){
    return{
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: null,
    }
  },
  methods:{
    async mixedPokemons(){
      this.pokemonArr = await getPokemonsOptions();
      //console.log(this.pokemonArr);

      const randomId = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[randomId]
    },
    checkAnswer(selectId){
      this.showAnswer = true;
      this.showPokemon = true;
      if(this.pokemon.id == selectId){
        this.message = `Correcto, este es el Pokemon ${this.pokemon.name}`
      }else{
        this.message = `Oops, el Pokemon era ${this.pokemon.name}`
      }
    },
    newGame(){
      this.pokemonArr = [];
      this.showAnswer = false;
      this.showPokemon = false;
      this.pokemon = null;
      this.mixedPokemons();
    }
  },
  mounted(){
    this.mixedPokemons();
  }
}
</script>

