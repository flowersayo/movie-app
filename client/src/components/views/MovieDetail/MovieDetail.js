import React, { useEffect,useState } from 'react'
import {API_KEY,API_URL,IMAGE_BASE_URL} from '../../Config'
import MainImage from '../Section/MainImage';
import MovieInfo from './Section/MovieInfo';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie,setMovie]=useState([]);
    useEffect(()=>{

        let endpointCredit = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

      fetch(endpointInfo)
        .then(response=>response.json())
        .then(response=>{
            setMovie(response); // 영화 정보 저장.
        })
        
    },[  ])

    return (
        <div>
             {/*Header */}
             <MainImage 
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}/>

             {/*Body*/}
             <div style={{width: '85%', margin: '1rem auto'}}>

             <MovieInfo Movie={Movie}></MovieInfo>
                 <br/>
                 {/*Actor Grid*/} 

                 <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                     <button>Toggle Actor View</button>
                 </div>
             </div>
        </div>
    )
}

export default MovieDetail
