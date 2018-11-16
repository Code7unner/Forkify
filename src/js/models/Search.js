import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '25a088f27ffcc8489389a5a22ee88553';

        try {
            const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = result.data.recipes;

        } catch (e) {
            alert(e);
        }
    }
}