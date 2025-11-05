import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import "../styles/Navbar.css";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const [localSearchTerm, setLocalSearchTerm] = useState(store.searchTerm); 

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setLocalSearchTerm(term);
        
        dispatch({
            type: "SET_SEARCH_TERM",
            payload: term,
        });
    };

    const handleRemoveFavorite = (item) => {
        dispatch({
            type: "REMOVE_FAVORITE",
            payload: item,
        });
    };

    return (
        <nav className="navbar navbar-light bg-light mb-0">
            <div className="container">
                <Link to="/" className="dbz-title navbar-brand mb-0 h">
                    Dragon Ball Z 
                </Link>
                
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control dbz-search"
                        placeholder="Search characters or planets..."
                        value={localSearchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="ml-auto">
                    <div className="dropdown">
                        <button
                            className="btn dbz-button dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Favorites ({store.favorites.length})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                            {store.favorites.length === 0 ? (
                                <li className="dropdown-item">No favorites added yet</li>
                            ) : (
                                store.favorites.map((fav) => (
                                    <li key={`${fav.type}-${fav.id}`} className="d-flex align-items-center justify-content-between dropdown-item">
                                        <Link to={`/details/${fav.type}/${fav.id}`} className="text-decoration-none text-dark">
                                            {fav.name} ({fav.type.slice(0, -1)})
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => handleRemoveFavorite(fav)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};