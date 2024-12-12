const searchInput = document.querySelector('.search-input');
const autocompleteList = document.querySelector('.autocomplete-list');
const repoList = document.querySelector('.repo-list');
const debounceTime = 300; 
let repositories = [];

const getRepositories = (query) => {
    return fetch(`https://api.github.com/search/repositories?q=${query}&per_page=5`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          return data.items;
        } else {
          return []; // Handle potential errors or empty result sets
        }
      });
  };

const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const displayAutocomplete = (repos) => {
    autocompleteList.innerHTML = '';
    if(repos.length === 0) {
        autocompleteList.style.display = 'none';
        return;
    }
    autocompleteList.style.display = 'block';
    repos.slice(0, 5).forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        li.addEventListener('click', () => {
            addRepo(repo);
            searchInput.value = '';
            autocompleteList.style.display = 'none';

        });
        autocompleteList.appendChild(li);
    });
};

const addRepo = (repo) => {
    const li = document.createElement('li');
    li.innerHTML = `${repo.name} <span>🙍🏼‍♂️(${repo.owner.login})</span>
     <span>⭐️ ${repo.stargazers_count}</span>
     <button class="delete-button" data-repo-id="${repo.id}"><img src="/img/black.png"></button>`;
    repoList.appendChild(li);

    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        li.remove();
    });
};



const handleSearch = debounce(() => {
    const query = searchInput.value;
    if (query) {
        getRepositories(query).then(displayAutocomplete);
    } else {
      autocompleteList.style.display = 'none';
    }
}, debounceTime);



searchInput.addEventListener('input', handleSearch);