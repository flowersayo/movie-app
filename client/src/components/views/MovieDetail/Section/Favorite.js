import React, { useEffect,useState } from 'react'
import Axios from 'axios'


function Favorite({movieId,movieInfo,userFrom}) {

   
    const movieTitle = movieInfo?.title;
    const moviePost = movieInfo?.backdrop_path;
    const movieRunTime = movieInfo?.runtime;
    
    const [FavoriteNumber,setFavoriteNumber]=useState(0);
    const [Favorited,setFavorited]=useState(false);

    console.log(Favorited);
    let variables = { 
        userFrom: userFrom, //누가 좋아요를 눌렀는지
        movieId : movieId, // 어떤 영화를 좋아했는지
        movieTitle:movieTitle,
        moviePost: moviePost, 
        movieRunTime: movieRunTime
        //좋아요 눌렀을 때 DB에 사용자 정보를 추가할때 필요한 정보들. 
    
    }
    
    useEffect(() => {
      
        Axios.post('/api/favorite/favoriteNumber',variables) //좋아요 누른사람 서버 부분에 요청보내기
        .then(response=>{
           
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber);
            }else{
                alert('숫자 정보를 가져오는데 실패 했습니다.')
            }
        })

        Axios.post('/api/favorite/favorited',variables) //내가 좋아했는지 아닌지 여부
        .then(response=>{
           
            if(response.data.success){
                setFavorited(response.data.favorited);
            }else{
                alert('숫자 정보를 가져오는데 실패 했습니다.')
            }
        })


    }, [])

    const onClickFavorite=()=>{

        if(Favorited){ // 이미 Favorited 가 되어있다면 서버에 제거요청
            Axios.post('/api/favorite/removeFromFavorite',variables)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1);
                    setFavorited(!Favorited); // true <->false 
                }else{
                    alert('Favorite 리스트에서 지우는 것을 실패했습니다.');
                }
            })

        }
        else{
            Axios.post('/api/favorite/addToFavorite',variables)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1);
                    setFavorited(!Favorited); // true <->false 
                }else{
                    alert('Favorite 리스트에서 추가하는 것을 실패했습니다.');
                }
            })
        }
    }
    return (
       <div>
        <button onClick={onClickFavorite}>{Favorited?"Not Favorited":"Add to Favorite"}{FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
