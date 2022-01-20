import React,{useEffect,useState} from 'react'
import './favorite.css';
import Axios from 'axios';



function FavoritePage() {


    const [Favorites,setFavorites]=useState([]);

    useEffect(() => {
 
            Axios.post('/api/favorite/getFavoredMovie',{userFrom: localStorage.getItem('userId')}) //userId를 백엔드에 같이 보내줌.
            .then(response=>{
                console.log(response.data);
                if(response.data.success){
                    setFavorites(response.data.favorites);
                }else{
                    alert("영화 정보를 가져오는데 실패했습니다.");
                }
            })
          
 
        // 유저가 좋아하는 영화 리스트
        
    }, [])

    return (
        <div style={{width: '85%',margin: '3rem auto'}}>
            <h2> Favorite Movies</h2>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
              {Favorites.map((favorite,index)=>(
                  <tr key={index}>
                  <td>{favorite.movieTitle}</td>
                  <td>{favorite.movieRunTime}</td>
                  <td><button>remove </button></td>
                  </tr>
              
              ))}
                
                   
                </tbody>
            </table>
          
        </div>
    )
}

export default FavoritePage
