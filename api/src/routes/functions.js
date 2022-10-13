const axios = require('axios');

module.exports = {
    getTypes: async function(){
        try {
            let types = await axios.get('https://pokeapi.co/api/v2/type/')
                .then((data) => {
                    return data.data.results;
                });
            return types;
        } catch (error) {
            return error;
        }
    }
};
            