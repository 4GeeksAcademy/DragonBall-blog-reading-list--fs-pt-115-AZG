const API_URL = "https://dragonball-api.com/api"; 

export const getInitialData = async (dispatch) => {
    dispatch({ type: "SET_LOADING" });
    
    try {
        const charUrl = `${API_URL}/characters?limit=10000`;
        const charRes = await fetch(charUrl);
        
        if (!charRes.ok) {
            console.error(`Error de respuesta en Characters (${charUrl}): ${charRes.status}`);
            throw new Error(`Error al cargar personajes: ${charRes.statusText}`);
        }
        const charData = await charRes.json();
        const planetUrl = `${API_URL}/planets?limit=10000`;
        const planetRes = await fetch(planetUrl);
        
        if (!planetRes.ok) {
            console.error(`Error de respuesta en Planets (${planetUrl}): ${planetRes.status}`);
            throw new Error(`Error al cargar planetas: ${planetRes.statusText}`);
        }
        const planetData = await planetRes.json();

        dispatch({
            type: "SET_DATA",
            payload: {
                characters: charData.items, 
                planets: planetData.items,
            },
        });

    } catch (error) {
        console.error("Error cargando datos iniciales:", error);
        dispatch({ type: "SET_DATA", payload: { characters: [], planets: [] } });
    }
};

export const getDetail = async (dispatch, type, id) => {
    dispatch({ type: "SET_LOADING" });
    const detailUrl = `${API_URL}/${type}/${id}`;
    
    try {
        const res = await fetch(detailUrl);

        if (!res.ok) {
            console.error(`Error de respuesta en Detalle (${detailUrl}): ${res.status}`);
            throw new Error(`Error al cargar detalle: ${res.statusText}`);
        }

        const data = await res.json();
        dispatch({ type: "SET_DETAIL", payload: data });

    } catch (error) {
        console.error("Error cargando detalle:", error);
        dispatch({ type: "SET_DETAIL", payload: null });
    }
};