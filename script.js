import {getRepositories} from "./modules/getRepositories.js"
import { debounce } from "./modules/debounce.js";
import { autocomplete } from "./modules/autocomplete.js";

const searchInput = document.querySelector('.search-input');
const debounceTime = 300; 



const search = debounce(() => {
    const query = searchInput.value;
    if (query) {
        getRepositories(query).then(autocomplete);
    } else {
      autocompleteList.style.display = 'none';
    }
}, debounceTime);



searchInput.addEventListener('input', search);