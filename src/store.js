export const initialStore = () => ({
    characters: [],
    planets: [],
    favorites: JSON.parse(localStorage.getItem("db_favorites")) || [],
    detail: null, 
    loading: true,
    searchTerm: "",
});

const storeReducer = (state, action) => {
    let newFavorites;

    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                characters: action.payload.characters,
                planets: action.payload.planets,
                loading: false,
            };
        
        case "SET_DETAIL":
            return {
                ...state,
                detail: action.payload,
                loading: false,
            };

        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
            
        case "SET_SEARCH_TERM":
            return {
                ...state,
                searchTerm: action.payload,
            };

        case "ADD_FAVORITE":
            if (state.favorites.some(fav => fav.id === action.payload.id && fav.type === action.payload.type)) {
                return state;
            }
            newFavorites = [...state.favorites, action.payload];
            localStorage.setItem("db_favorites", JSON.stringify(newFavorites));
            return {
                ...state,
                favorites: newFavorites,
            };

        case "REMOVE_FAVORITE":
            newFavorites = state.favorites.filter(
                (fav) => !(fav.id === action.payload.id && fav.type === action.payload.type)
            );
            localStorage.setItem("db_favorites", JSON.stringify(newFavorites));
            return {
                ...state,
                favorites: newFavorites,
            };

        default:
            return state;
    }
};

export default storeReducer;