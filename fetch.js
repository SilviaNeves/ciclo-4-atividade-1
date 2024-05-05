const apiURL = "https://rickandmortyapi.com/api/character";

let currentPage = 1;
let totalPages = 1;

// Função assíncrona para obter dados da API
async function fetchCharactersAndDisplayCards(nameFilter, statusFilter, speciesFilter, page = 1) {
try {
// Fazendo a requisição api filtrando nome, status, espécie e página
        const response = await fetch(`${apiURL}?name=${nameFilter}&status=${statusFilter}&species=${speciesFilter}&page=${page}`);
// Verificando se a requisição foi bem sucedida
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        } 
// Transformando a resposta em JSON
        const data = await response.json();
        // Salva o número total de páginas
        totalPages = data.info.pages; 
// Obtendo o elemento div onde os dados dos personagens serão exibidos
        const cardContainer = document.getElementById('card-container');
// Exibindo os dados dos personagens
        data.results.forEach(character => {
// Cria um div para o card
        const card = document.createElement('div');
        card.className = 'character-card';
// Cria um img para a imagem do personagem
        const img = document.createElement('img');
        img.src = character.image;
        card.appendChild(img);
// Cria um h2 para o nome do personagem
        const name = document.createElement('h2');
        name.textContent = `${character.name}`;
        card.appendChild(name);
// Cria um p para a espécie do personagem
        const species = document.createElement('p');
        species.textContent = `Espécie: ${character.species}`;
        card.appendChild(species);
// Cria um p para o status do personagem
        const status = document.createElement('p');
        status.textContent = `Status: ${character.status}`;
        card.appendChild(status);
// Adiciona o card ao container
        cardContainer.appendChild(card);
        });
        
// Tratando possíveis erros
        } catch (error) {
        console.log('Houve um erro:', error);
}
}
// // evento pra buscar o personagem
// document.getElementById('searchInput').addEventListener('input', (event) => {
//         const searchQuery = event.target.value;
//         fetchCharactersAndDisplayCards(searchQuery, "", "", 1);
// });
// Event listener para o botão "Mostrar Mais"
document.getElementById('mostrarMais').addEventListener('mouseover', () => {
        if (currentPage < totalPages) {
        currentPage++;
        fetchCharactersAndDisplayCards("", "", "", currentPage);
        } else {
        alert("Não há mais personagens para mostrar.");
        }
});

// Chamando a função para obter os personagens e exibir os cards
fetchCharactersAndDisplayCards("", "", "", "currentPage");

