import React,{useEffect,useState} from 'react'
import './favorite.css';
import Axios from 'axios';
import {Popover} from 'antd';
import {IMAGE_BASE_URL} from '../../Config';

function FavoritePage() {


    const [Favorites,setFavorites]=useState([]);

    useEffect(() => {
 
        fetchFavoredMovie();
        
    }, [])

 
    // 유저가 좋아하는 영화 리스트 가져오기
    const fetchFavoredMovie = ()=>{
        Axios.post('/api/favorite/getFavoredMovie',{userFrom: localStorage.getItem('userId')}) //userId를 백엔드에 같이 보내줌.
            .then(response=>{
                //console.log(response.data);
                if(response.data.success){
                    setFavorites(response.data.favorites);
                }else{
                    alert("영화 정보를 가져오는데 실패했습니다.");
                }
            })
    }
   const onClickDelete = (movieId, userFrom) => {
        const variables = { movieId, userFrom }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert("리스트에서 지우는데 실패했습니다.")
                }
            })
    }

    const renderCards= Favorites.map((favorite,index)=>{
        const content=(
            <div>
                {favorite.moviePost?
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/>:"no image"
                }
        
            </div>
        );
      

        return <tr key={index}>
         <Popover content={content} title={`${favorite.movieTitle}`}/*content = popover시에 뜰 화면*/>
        <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime}mins</td>
        <td><button onClick={()=>onClickDelete(favorite.movieId,favorite.userFrom)}>Remove </button></td>
        </tr>
        
    
    })

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
                {renderCards}
          
                   
                </tbody>
            </table>
          
        </div>
    )
}

export default FavoritePage
