const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
   userFrom : { // 유저 아이디 하나로 유저의 모든 정보를 가져올 수 있게끔
       type : Schema.Types.ObjectId,
       ref: 'User'
   },
   movieId: {
       type : String
   },
   movieTitle: {
       type : String
   },
   moviePost : {
       type : String
   },
   movieRunTime: {
    type: String
}
},{timestamps:true})//timestamps -> 생성된 시간 자동으로 처리


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }