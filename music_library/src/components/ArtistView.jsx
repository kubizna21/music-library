import { useState, useEffect } from "react";
import { useParams, useNavigate } from   'react-router-dom';


export default function ArtistView() {
    const { id } =useParams()
    const [artistData, setArtistData] = useState ([])
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData =  async () => {
            const API_URL = `http://localhost:4000/album${id}`;
            const response = await fetch(API_URL);
            const resData = await response.json();
            console.log(resData);
        }
        fetchData();

      });

      const justAlbums = artistData.filter(entry => entry.collectionType === 'Album');

      const renderAlbums = justAlbums.map((album, index) => {
        return (
            <div key={index}>
                <link to={ `/album/${album.collectionId }` }>
                <p>{ album.collectionName }</p>
                </link>
            </div>
        )
      });

    return (
        <div>
            { artistData[0]?.artistName}
            { navButtons ()}
            { renderAlbums }
        </div>
    )

}