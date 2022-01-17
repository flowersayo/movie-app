import React from 'react'
import {Col} from 'antd';

function GridCard(props) {
    if(props.landingPage){
        return (
            <Col lg={6} md={8} xs={24}/* 한 줄이 24 size */> 
            <div style={{ position : 'relative'}}>
               <a href ={`/movie/${props.movieId}`/*영화 상세페이지로 이동*/}>
                   <img style={{ width : '100%', height: '400px' }}src={props.image} alt={props.movieName}/>
               </a>
    
            </div>
            </Col>
        )
    }
    else{
        return (
            <Col lg={6} md={8} xs={24}/* 한 줄이 24 size */> 
            <div style={{ position : 'relative'}}>
    
            <img style={{ width : '100%', height: '400px' }}src={props.image} alt={props.characterName}/>
               
    
            </div>
            </Col>
        )
    }
 
}

export default GridCard
