const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon)=>
                
                `<li class="pokemon ${pokemon.type}" onclick="habilities(${pokemon.number})">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`)
                            .join(' ')}
                        </ol>
                            <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                    </div>
                </li>`)
            .join('')

            pokemonList.innerHTML += newHtml;
        })
    }


    loadPokemonItens(offset,limit)

    loadMoreButton.addEventListener('click', () => {
        offset += limit

        const qtdRecordNextPage = offset + limit
        if(qtdRecordNextPage >= maxRecords){
            const newLimit = maxRecords-offset
            loadPokemonItens(offset, newLimit)
            
            loadMoreButton.parentElement.removeChild(loadMoreButton);
        } else {
            loadPokemonItens(offset, limit)
        }

    })


    function habilities(id){
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`
        fetch(url)
        .then(response=>response.json())
        .then(e=>modalPokemonSingle(e))
    }


    function modalPokemonSingle(caracteristcs){
        console.log(caracteristcs)
        let modal = `
        <div class="modal fade" id="myModal${caracteristcs.id}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark text-white">
                <div class="modal-header ${caracteristcs.types[0].type.name}">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">${capitalizeCase(caracteristcs.name)}</h1>
                </div>
                <div class="modal-body">
                    <div class="imagem-pokemon-single ${caracteristcs.types[0].type.name}">
                        <img src="https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${caracteristcs.id}.gif"/>
                    </div>
                    <div class="tipos-pokemon-single">
                    <ul class="d-flex justify-content-center mt-5 text-center">
                        ${caracteristcs.types.map((type) => `<li class="type d-inline ${type.type.name}">${type.type.name}</li>`)
                        .join(' ')}
                    </ul>
                    </div>
                    <div class="habilidades text-center">
                        <p>Habilidades: ${caracteristcs.abilities.map(e=>" "+capitalizeCase(e.ability.name))}</p>
                    </div>
                    <div class="altura-peso d-flex justify-content-around">
                        <label>Altura
                            <p>${caracteristcs.height/10} m</p>
                        </label>
                        <label>Peso
                            <p>${caracteristcs.weight} Kg</p>
                        </label>
                    </div>
                    <div class="status">
                        <ul>`
                        caracteristcs.stats.forEach(element => {
                            modal+= `<li class="d-flex align-items-center justify-content-between"><span>${element.stat.name.toUpperCase()}</span><progress class="progress-abilities" max="270" value="${element.base_stat}" ></progress></li>`    
                        })
                        modal+=`
                            <li class="d-flex align-items-center justify-content-between"><span>EXP</span><progress class="progress-abilities" max="270" value="${caracteristcs.base_experience}" ></progress></li>
                        </ul>
                    </div>
                </div>  
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
        `
        $('body').append(modal)
        const options = {
            keyboard: false,
            backdrop: true
          }
        const myModal = new bootstrap.Modal(document.getElementById('myModal'+caracteristcs.id), options)

        myModal.show();
    }