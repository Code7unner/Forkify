//Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

//Global state of the app
const state = {};

/**
 * SEARCH CONTROLLER
**/
const controlSearch = async () => {
    //Get query from view
    const query = searchView.getInput();

    if (query) {
        //New search object and add to state
        state.search = new Search(query);

        //Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //Search for recipes
            await state.search.getResults();

            //Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
     e.preventDefault();
     controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);

        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});
