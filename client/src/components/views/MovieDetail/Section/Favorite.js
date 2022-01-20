import React, { useEffect } from 'react'
import Axios from 'axios'


function Favorite({movieId,movieInfo,userFrom}) {

    //const movieTitle = movieInfo.title;
   // const moviePost = movieInfo.backdrop_path;
    //const movieRunTime = movieInfo.runtime;

    useEffect(() => {
        let variables = { 
            userFrom, //누가 좋아요를 눌렀는지
            movieId // 어떤 영화를 좋아했는지
        }
        Axios.post('/api/favorite/favoriteNumber',variables) //좋아요 누른사람 서버 부분에 요청보내기
        .then(response=>{
           
            if(response.data.success){
                console.log(response.data);
            }else{
                alert('숫자 정보를 가져오는데 실패 했습니다.')
            }
        })

        

    }, [])

    return (
       <div>
        <button>Favorite</button>
        </div>
    )
}

export default Favorite
