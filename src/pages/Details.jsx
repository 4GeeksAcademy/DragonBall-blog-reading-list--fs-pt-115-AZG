import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getDetail } from "../services/callsAPI";
import "../styles/Details.css";

export const Details = () => {
 
    const { type, id } = useParams(); 
    const { store, dispatch } = useGlobalReducer();
    const { detail, loading } = store;

 
    useEffect(() => {
        getDetail(dispatch, type, id);

        return () => {
            dispatch({ type: "SET_DETAIL", payload: null });
        };
    }, [dispatch, type, id]);


    if (loading || !detail) {
        return <div className="text-center p-5">
            {loading ? "Loading details..." : "Loading details..."}
        </div>;
    }
    //si la api no me da nada///
    if (detail.message === "Not found") {
        return <div className="alert alert-danger text-center p-5">
            Error: Item type **{type}** with ID **{id}** not found.
        </div>
    }


    return (
        <div className="container my-5 dbz-details-container">
            <div className="row">
                <div className="col-md-5">
                    <img 
                        src={detail.image || `https://i.imgur.com/KxT5g0N.png`}
                        className="img-fluid rounded" 
                        alt={detail.name}
                    />
                </div>
                <div className="col-md-7">
                    <h1 className="display-4 mb-3 dbz-detail-name">{detail.name}</h1>
                    <p className="lead border-bottom pb-3">
                        **Type:** {type.slice(0, -1).toUpperCase()}
                    </p>
                    
               
                    <dl className="row mt-4 dbz-detail-list">
                        <dt className="col-sm-3">Name:</dt>
                        <dd className="col-sm-9">{detail.name}</dd>
                        
                        <dt className="col-sm-3">Description:</dt>
                        <dd className="col-sm-9">{detail.description}</dd>

    
                        {type === "characters" && (
                            <>
                                <dt className="col-sm-3">Race:</dt>
                                <dd className="col-sm-9">{detail.race}</dd>
                                
                                <dt className="col-sm-3">Affiliation:</dt>
                                <dd className="col-sm-9">{detail.affiliation}</dd>

                                <dt className="col-sm-3">Ki:</dt>
                                <dd className="col-sm-9">{detail.ki}</dd>
                            </>
                        )}
                        
                        {type === "planets" && (
                            <>
                                <dt className="col-sm-3">Type:</dt>
                                <dd className="col-sm-9">{detail.type}</dd>
                                
                                <dt className="col-sm-3">Is Destroyed:</dt>
                                <dd className="col-sm-9">{detail.isDestroyed ? "Yes" : "No"}</dd>

                                <dt className="col-sm-3">Inhabitants:</dt>
                                <dd className="col-sm-9">{detail.inhabitants}</dd>
                            </>
                        )}
                    </dl>
                </div>
            </div>
            <hr className="my-4" />
        </div>
    );
};