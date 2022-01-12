import React, { useEffect,useState } from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL,API_KEY,IMAGE_BASE_URL} from '../../Config';
import MainImage from '../Section/MainImage';
import GridCard from '../commons/GridCard';
import {Row} from 'antd';
/*
생각해 볼 것 
1. CurrentPage 를 처음에 1로 설정해놓지 않은 이유?
2. 
*/
function LandingPage() {

    const [Movies,setMovies]=useState([]);
    const [MainMovieImage,setMainMovieImage]=useState(null);
    const [CurrentPage,setCurrentPage]=useState(0); // fetch 후에 증가

    useEffect(()=>{ // mount 시에 호출
        const endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);

    },[])
  
    const fetchMovies = (endpoint)=>{
        console.log(CurrentPage+1);
        fetch(endpoint)
        .then(response => response.json())
        .then(response =>{
        
            console.log(response);
            setMovies([...Movies,...response.results]); // 기존에 존재하던것 + 새로 fetch 한 것
            setMainMovieImage(response.results[0]); // 가장 인기있는 무비 Top1
            setCurrentPage(response.page);
        });
  
    }

    const loadMoreItems = (CurrentPage)=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
        fetchMovies(endpoint);
    }

    return (
       <div style={{ width : '100%', margin: '0'}}>
          {MainMovieImage && 
          <MainImage 
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}/>}
          
           <div style={{ width : '85%', margin: '1rem auto'}}>
            <h2>Movies by latest</h2>
            <hr/>

           <Row gutter={[16,16]}>
               {Movies && Movies.map((movie,index)=>(
                   <React.Fragment key={index}>
                       <GridCard 
                        image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}`:null}
                        movieId={movie.id/*고유의 영화정보*/}
                        movieName ={movie.original_title}
                       />

                   </React.Fragment>
                ) )}
           </Row>

           </div>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <button onClick={()=>loadMoreItems(CurrentPage)}>Load more</button> 
            </div>
       </div>
    )
}

export default LandingPage;

