import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/Card.css";

const displayValue = (key, value) => {
    if (key === 'isDestroyed' && typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    if (!value && value !== 0 && value !== false) {
        return "N/A"; 
    }
    return value;
};

export const Card = ({ item, itemType, fields }) => {
    const { store, dispatch } = useGlobalReducer();
    
    const isFavorite = store.favorites.some(
        (fav) => fav.id === item.id && fav.type === itemType
    );

    const handleToggleFavorite = () => {
        const favoriteItem = {
            id: item.id,
            name: item.name,
            type: itemType,
        };

        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: favoriteItem });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: favoriteItem });
        }
    };

    return (
        <div className="card dbz-card" style={{ minWidth: "18rem", margin: "10px" }}>
            <img 
                src={item.image || `https://i.imgur.com/KxT5g0N.png`} 
                className="card-img-top" 
                alt={item.name} 
                style={{ 
                    height: "200px", 
                    objectFit: "cover",
                    objectPosition: "top" 
                }}
            />
            <div className="card-body">
                <h5 className="card-title dbz-card-title">{item.name}</h5>
                <hr />
                {fields.map((field) => (
                    <p className="card-text dbz-card-text" key={field.key}>
                        **{field.label}:** {displayValue(field.key, item[field.key])}
                    </p>
                ))}
                
                <Link to={`/details/${itemType}/${item.id}`} className="btn dbz-btn-learn-more">
                    Learn more!
                </Link>
                
                <button
                    onClick={handleToggleFavorite}
                    className={`btn ms-2 dbz-button ${isFavorite ? "" : "btn-outline-warning"}`}
                >
                    <i className={`fa-heart ${isFavorite ? "fas" : "far"}`}></i>
                </button>
            </div>
        </div>
    );
};