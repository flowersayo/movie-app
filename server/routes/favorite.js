const express = require('express');
const router = express.Router(); // express 프레임워크에서 제공하는 router
const {Favorite} = require('../models/Favorite'); // 만들어 둔 DB

//favoriteNumber를 반환하는 API
router.post('/favoriteNumber',(request,response)=>{ //post 리퀘스트를 받기 때문. get이면 get으로 받아야함.
   
//request.body.movieId -> bodyParser를 이용해프론트에서 인자로 같이 전달한 variables 받기.  
//mongoDB에서특정영화의 favorite 숫자를 가져오기
Favorite.find({"movieId" :request.body.movieId }) // 쿼리문.front에서 보낸 movieId랑 Favortie model의 movieId 중 같은 것을 찾아달라. 
    .exec((err,info)=>{ //movieId에 해당하는 정보가 info에 담겨있음 [1,2,3] 같이 누가 좋아했는지가 담김.
        if(err) return response.status(400).send(arr)//에러 발생시 에러를 클라이언트에 보냄
    
        // 그 다음에 프론트에 다시 숫자 정보를 보내주기.
        response.status(200).json({success:true,favoriteNumber: info.length})//json 형식으로 좋아하는 사람이 몇명인지를 클라이언트에전달.
    })
})
 


router.post('/favorited',(request,response)=>{ 
   
    //내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
       Favorite.find({"movieId" :request.body.movieId,"userFrom" :request.body.userFrom }) // 해당 두 조건을 만족하는 정보 찾기
           .exec((err,info)=>{ 
               if(err) return response.status(400).send(arr)
           
               // 값이 [] : 해당 사용자가 favorite 리스트에 넣지 않음.
               let result = false;
               if(info.length!=0)
               result=true;
               // 그 다음에 프론트에 다시 숫자 정보를 보내주기.
               response.status(200).json({success:true,favorited:result })//json 형식으로 좋아하는 사람이 몇명인지를 클라이언트에전달.
           })
})
   
// 유저를 해당 영화에 좋아요 누른 사람 리스트에서 제거.
router.post('/removeFromFavorite',(request,response)=>{ 
   Favorite.findOneAndDelete({'movieId': request.body.movieId ,'userFrom': request.body.userFrom}) // 이 두 조건에 해당하는 db모델 지우기. 
   .exec((err,doc)=>{
        if(err) return response.status(400).send(err);
        else response.status(200).json({success: true,doc :doc}); 
   })
})

router.post('/addToFavorite',(request,response)=>{ 
   /*
   인자로 같이 보낸것들 
   let variables = { 
        userFrom:userFrom, //누가 좋아요를 눌렀는지
        movieId : movieId, // 어떤 영화를 좋아했는지
        movieTitle:movieTitle,
        moviePost: moviePost, 
        movieRunTime: movieRunTime
        //좋아요 눌렀을 때 DB에 사용자 정보를 추가할때 필요한 정보들. 
    
    }
   */
    //request.body에 프론트에서 인자로 같이 보낸 것들 들어있음
   const favorite = new Favorite(request.body) //새로운 db모델 생성

   favorite.save((err,doc)=>{ // 추가(=저장)
       if(err) return response.status(400).send(err);
       else response.status(200).json({success: true,doc :doc}) 
   }); // favorite doc 에 다 들어감.
})

//좋아하는 영화들 정보 가져오기
router.post('/getFavoredMovie',(request,response)=>{ 
    Favorite.find({'userFrom' : request.body.userFrom}) //Favorite DB 모델에서 userFrom과 일치하는 것 찾기.
    .exec((err,favorites)=>{ 
        if(err) return response.status(400).send(arr)
        return response.status(200).json({success: true,favorites})
    })
 })
 


   module.exports = router;