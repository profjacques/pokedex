// Seleciona os elementos HTML que irão exibir os dados do Pokémon
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');

// Seleciona o formulário e o campo de entrada de texto
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

// Define a variável que armazenará o número do Pokémon a ser pesquisado
let searchPokemon = 1;

// Função assíncrona que busca os dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
  // Faz uma requisição à API do Pokémon
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  // Verifica se a resposta foi bem-sucedida (status 200)
  if (APIResponse.status === 200) {
    // Converte a resposta para JSON
    const data = await APIResponse.json();
    // Retorna os dados do Pokémon
    return data;
  }
}

// Função assíncrona que renderiza os dados do Pokémon na página
const renderPokemon = async (pokemon) => {
  // Exibe mensagem de "Pesquisando..." enquanto os dados são carregados
  pokemonName.innerHTML = 'Pesquisando...';
  pokemonNumber.innerHTML = '';

  // Chama a função fetchPokemon para obter os dados do Pokémon
  const data = await fetchPokemon(pokemon);

  // Verifica se os dados foram obtidos com sucesso
  if (data) {
    // Exibe a imagem do Pokémon
    pokemonImage.style.display = 'block';
    // Define o número e o nome do Pokémon
    pokemonNumber.innerHTML = data.id + ' -';
    pokemonName.innerHTML = data.name;

    // Define a altura e o peso do Pokémon
    pokemonHeight.innerHTML = 'Altura:' + ' ' + (data.height * 0.1).toFixed(2) + ' ' + 'metro(s)';
    pokemonWeight.innerHTML = 'Peso: ' + (data.weight / 10) + 'kg'

    // Verifica a geração do Pokémon e define a imagem apropriada
    if (data.id >= 1 && data.id <= 649) {
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }

    if (data.id >= 650 && data.id <= 721) {
      pokemonImage.src = data['sprites']['versions']['generation-vi']['x-y']['front_default'];
      document.querySelector('.pokemon__image').style.width = '10%';
      document.querySelector('.pokemon__image').style.height = '15%';
      document.querySelector('.pokemon__image').style.bottom = '50%';
    }

    if (data.id >= 721 && data.id <= 809) {
      pokemonImage.src = data['sprites']['versions']['generation-vii']['icons']['front_default'];
      document.querySelector('.pokemon__image').style.width = '16%';
      document.querySelector('.pokemon__image').style.height = '14%';
      document.querySelector('.pokemon__image').style.bottom = '50%';
    }

    if (data.id >= 809 && data.id <= 905) {
      pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
      document.querySelector('.pokemon__image').style.width = '16%';
      document.querySelector('.pokemon__image').style.height = '14%';
      document.querySelector('.pokemon__image').style.bottom = '49.5%';
    }

    // Limpa o campo de entrada
    input.value = '';
    // Atualiza o número do Pokémon pesquisado
    searchPokemon = data.id;
    return data.id;
  }
  else {
    // Caso não encontre o Pokémon, esconde a imagem e exibe mensagem de erro
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Tente novamente';
    pokemonNumber.innerHTML = '';
    pokemonHeight.innerHTML = '------------------';
    pokemonWeight.innerHTML = '------------------';
  }
}

// Adiciona um event listener ao formulário para capturar o evento de submissão
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
  renderPokemon(input.value.toLowerCase()); // Chama a função renderPokemon com o valor do campo de entrada em letras minúsculas
});

// Renderiza o Pokémon inicial com o número definido em searchPokemon
renderPokemon(searchPokemon);
