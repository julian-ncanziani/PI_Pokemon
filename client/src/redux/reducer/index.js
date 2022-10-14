import { GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES } from "../actions";

const initialState = {
    pokemons : [],
    types: []
};

export const  rootReducer = (state = initialState, action)=>{
    
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }

        case GET_POKEMON_BY_NAME: 
        return {
            ...state,
            pokemons: Array(action.payload)
        }

        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }

        default:
           return state;
    }
};

