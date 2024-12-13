
const searchInput = document.querySelector('.search-input');
const autocompleteList = document.querySelector('.autocomplete-list');
const repoList = document.querySelector('.repo-list');



 export const autocomplete = (repos) => {
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
    li.innerHTML = `${repo.name} <span>🙍🏼‍♂️${repo.owner.login}</span>
     <span>⭐️ ${repo.stargazers_count}</span>
     <button class="delete-button" data-repo-id="${repo.id}"><img src="img/black.png"></button>`;
    repoList.appendChild(li);

    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        li.remove();
    });
};