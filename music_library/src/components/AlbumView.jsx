import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

export default function AlbumView(){
    const { id } =useParams();


    useEffect(() => {
        const API_URL = `http:localhost:4000/song/${id}`;
        const fetchData = async() => {
            const response = await fetch(API_URL);
            const resData = await response.json();
            setAlbumData(resData.results);
        }
        fetchData();

    }, [id]);

    const navButtons = () => {
        return (
            <div>
                <button type="button"  onCLick={ ()=> navigate(-1)}>Back</button>

                <button type="button" onClick={ () => navigate('/')}>Home</button>
            </div>
        )
    }


    const justSongs = albumData.filter(entry => entry.wrapperType === 'track');

    const renderSongs = justSongs.map ((song, index) => {
        return (
            <div key={index}>
                <p> { song.trackName } </p>
            </div>
        )
    })


    return (
        <div>
            <p>
                { renderSongs }
            </p>
        </div>
    )

}