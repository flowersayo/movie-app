const express = require('express');
const router = express.Router(); // express 프레임워크에서 제공하는 router
const {Favorite} = require('../models/Favorite'); // 만들어 둔 DB

//favoriteNumber를 반환하는 API
router.post('/favoriteNumber',(request,response)=>{ //post 리퀘스트를 받기 때문. get이면 get으로 받아야함.
   
//request.body.movieId -> bodyParser를 이용해프론트에서 인자로 같이 전달한 variables 받기.  
//mongoDB에서 favorite 숫자를 가져오기
Favorite.find({"movieId" :request.body.movieId }) // 쿼리문.front에서 보낸 movieId랑 Favortie model의 movieId 중 같은 것을 찾아달라. 
    .exec((err,info)=>{ //movieId에 해당하는 정보가 info에 담겨있음 [1,2,3] 같이 누가 좋아했는지가 담김.
        if(err) return response.status(400).send(arr)//에러 발생시 에러를 클라이언트에 보냄
    
        // 그 다음에 프론트에 다시 숫자 정보를 보내주기.
        response.status(200).json({success:true,favoriteNumber: info.length})//json 형식으로 좋아하는 사람이 몇명인지를 클라이언트에전달.
    })
})
 


