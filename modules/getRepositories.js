export const getRepositories = (query) => {
  return fetch(`https://api.github.com/search/repositories?q=${query}&per_page=5`)
    .then(response => response.json())
    .then(data => {
      if (data.items) {
        return data.items;
      }
    }).catch(error => console.log(error));
};