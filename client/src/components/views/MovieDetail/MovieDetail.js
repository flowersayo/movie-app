import React, { useEffect,useState } from 'react'
import {API_KEY,API_URL,IMAGE_BASE_URL} from '../../Config'
import MainImage from '../Section/MainImage';
import MovieInfo from './Section/MovieInfo';
import GridCard from '../commons/GridCard';
import {Row} from 'antd';
import Favorite from './Section/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie,setMovie]=useState(null);
    const [Casts,setCasts]=useState(null);
    const [ActorToggle, setActorToggle] = useState(false);
    
    useEffect(()=>{

        let endpointCredit = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

      fetch(endpointInfo)
        .then(response=>response.json())
        .then(response=>{
           // console.log(response);
            setMovie(response); // 영화 정보 저장.
        })

        fetch(endpointCredit)
        .then(response=>response.json())
        .then(response=>{
            //console.log(response);
            setCasts(response.cast); // 출연진 정보 저장.
        })
    },[  ])

    return (
        <div>
             {/*Header */}
             
     
          {Movie && 
             <MainImage 
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}/>}

            
            <div style={{width: '85%', margin: '1rem auto'}}>
            <div style={{ display: 'flex',justifyContent: 'flex-end'}}>
                <Favorite movieId={movieId} movieInfo={Movie} userFrom={localStorage.getItem('userId')}/>
            </div>
                
             {Movie && <MovieInfo Movie={Movie}></MovieInfo>}
                 <br/>

                 <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                     <button onClick={()=>setActorToggle(!ActorToggle)}>Toggle Actor View</button>
                 </div>

                {ActorToggle && // 버튼이 눌린 상태여야.
                 <Row gutter={[16,16]}>

               {Casts && Casts.map((Casts,index)=>( 
                   <React.Fragment key={index}>
                       <GridCard 
                        image={Casts.profile_path ? `${IMAGE_BASE_URL}w500${Casts.profile_path}`:null}
                        characterName ={Casts.name}
                       />

                   </React.Fragment>
                ) )}
              </Row>
                }

             </div>
        </div>
    )
}

export default MovieDetail
