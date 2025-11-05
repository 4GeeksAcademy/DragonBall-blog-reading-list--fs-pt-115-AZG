import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getInitialData } from "../services/callsAPI";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import "../styles/Home.css";


const characterFields = [
    { key: "race", label: "Race" },
    { key: "affiliation", label: "Affiliation" },
];

const planetFields = [
    { key: "type", label: "Type" },
    { key: "isDestroyed", label: "Destroyed" },
];

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.characters.length === 0 && store.planets.length === 0) {
            getInitialData(dispatch);
        }
    }, [dispatch, store.characters.length, store.planets.length]);

    const { characters, planets, searchTerm } = store;

    const filterItems = (items) => {
        if (!searchTerm) return items;

        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            (item.race && item.race.toLowerCase().includes(searchTerm)) ||
            (item.type && item.type.toLowerCase().includes(searchTerm))
        );
    };

    const filteredCharacters = filterItems(characters);
    const filteredPlanets = filterItems(planets);


    if (store.loading && store.characters.length === 0 && store.planets.length === 0) {
        return <div className="text-center p-5">Loading data...</div>;
    }

    return (
        <div className="dbz-background">
            <div className="container mb-5 dbz-content-overlay">
                <h2 className="mb-4 text-danger dbz-section-title">🕴️ Characters ({filteredCharacters.length})</h2>
                <div className="d-flex overflow-auto pb-3">
                    {filteredCharacters.length === 0 ? (
                        <p className="p-3">
                            {searchTerm ? `No characters match the search term "${searchTerm}".` : "No characters found or failed to load."}
                        </p>
                    ) : (
                        filteredCharacters.map((character) => (
                            <Card
                                key={`char-${character.id}`}
                                item={character}
                                itemType="characters"
                                fields={characterFields}
                            />
                        ))
                    )}
                </div>

                <hr className="my-5" />

                <h2 className="mb-4 text-primary dbz-section-title">🌎 Planets ({filteredPlanets.length})</h2>
                <div className="d-flex overflow-auto pb-3">
                    {filteredPlanets.length === 0 ? (
                        <p className="p-3">
                            {searchTerm ? `No planets match the search term "${searchTerm}".` : "No planets found or failed to load."}
                        </p>
                    ) : (
                        filteredPlanets.map((planet) => (
                            <Card
                                key={`planet-${planet.id}`}
                                item={planet}
                                itemType="planets"
                                fields={planetFields}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};