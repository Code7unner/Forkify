// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from "./views/base";

//Global state of the app
const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        //Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        //Search the results
        await state.search.getResults();

        //Render results on UI
        searchView.renderResults(state.search.result);
    }

};

elements.searchForm.addEventListener('submit', e => {
     e.preventDefault();
     controlSearch();
});
