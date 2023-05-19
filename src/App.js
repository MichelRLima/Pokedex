import {useState} from 'react'
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {

  const [buscar, setBuscar] = useState("")
  
  const [checkpokemon, setCheckPokemon] = useState(false)
  const [pokemon, setPokemon] = useState(
    {nome: "",
     id:"",
     peso:"",
     altura:"",
     tipo:"",
     foto:"",
}
    )



function Buscar(){
      

    if(buscar !== ""){

      setCheckPokemon(false)

      axios.get(`https://pokeapi.co/api/v2/pokemon/${buscar}`)
     .then(response =>{
      var pokemonData = response.data
      console.log(pokemonData)
      
      //setPokemon({...pokemon, id: pokemonData.id})//console.log(pokemonData.id)  //numero
      //setPokemon({...pokemon, peso:pokemonData.weight}) //console.log(pokemonData.weight) //peso
      //setPokemon({...pokemon, altura:pokemonData.height }) //console.log(pokemonData.height) //altura
      //setPokemon({...pokemon, tipo:pokemonData.types[0].type.name }) //console.log(pokemonData.types[0].type.name) //tipo do pokemon
      //setPokemon({...pokemon, foto:pokemonData.sprites.front_default}) // console.log(pokemonData.sprites.front_default) //tipo do pokemon
      setPokemon({...pokemon, nome: pokemonData.name,
                                id: pokemonData.id,
                                peso:pokemonData.weight,
                                altura:pokemonData.height,
                                tipo:pokemonData.types[0].type.name,
                                foto:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`
                              })//console.log(pokemonData.name) //nome
      
      setCheckPokemon(true)
      
    }).catch(error =>{
        console.log("error")
        setCheckPokemon(false)
        setPokemon({...pokemon, nome:""})
    })

  }

  }
  
    
console.log(pokemon)



  return (
    <div className="App">
      <div className='titulo'>
     <h2>P</h2> <div className='imagem'></div><h2>kedex</h2>
     </div>

    <div className='containerBuscar'>
     
     <h3 className='TituloBuscar'>Busque seu Pokemon</h3>

     </div>

     <div className='buscar'>
     <input onChange={(e) => setBuscar((e.target.value).toLowerCase())} placeholder="Ex: Pikachu ou 25" type='text' inputMode='text'></input>
     <Button onClick={Buscar} variant="secondary">Search</Button>
     </div>

     {checkpokemon &&(
        <div className='pokemon'>

            <h4>{pokemon.nome}</h4><span>ID:{pokemon.id}</span>
            <img src={pokemon.foto} alt='pokemon' />
            <div>
            <p className={pokemon.tipo}>{pokemon.tipo}</p>
              <div className='descricaoPokemon'>
              
              <p>Altura: {((parseFloat(pokemon.altura))/10).toFixed(2)}m</p>
              <p>Peso: {((parseFloat(pokemon.peso))/10).toFixed(2)}Kg</p>
              </div>
             
            </div>
           


        </div>
     )}
     

    </div>
  );
}

export default App;
