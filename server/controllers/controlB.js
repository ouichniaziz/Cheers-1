const { getHome,postCategory,getCategories,PlusFavorite,SelectFav } = require("../queries/query_user/queryB.js");
const { removeEventFromFavorite} = require('../queries/query_user/queryM.js');
const {cloudinary} =require('../../cloudinary')

const homeGet = (req, res) => {
    getHome().then((result) => {
      res.send(result);
    });
  };
const CategoryPosting = (req,res) => { 
    const fileStr = req.body.category_image;
    cloudinary.uploader.upload(fileStr, {
     upload_preset :'dev_setups'})
     .then((result) => { 
       let image =result.url;
       postCategory(req.body, image)
       .then((result)=> {  
         res.status(201).json(result) 
       }).catch(()=> {res.status(401).send('request error')})
         
       }).catch(()=> { res.status(401).send('cloudinary error')})
}

const gettingGategories = (req,res) => {
  getCategories().then((result) => {
    res.send(result)
  })
}

const addToFav = (req,res) => {
  console.log(req.body);
 const {user_id, event_id} = req.body
SelectFav(user_id,event_id).then((result) => {
  console.log(result)
  if(result.length){
    removeEventFromFavorite(event_id,user_id).then(
      res.status(200).send('removed')
    )
    .catch((err) => {
        res.status(400).send(err)
      })
  }else {
    PlusFavorite(user_id, event_id).then((result) => {
         res.status(201).send('added to favorite')
       })
       .catch((err) => {
        res.status(400).send(err)
      })
  }
})
.catch((err) => {
  res.status(401)
})
}



module.exports = {
    homeGet,
    CategoryPosting,
    gettingGategories,
    addToFav,
  };
