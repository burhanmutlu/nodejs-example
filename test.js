const mongoose = require('mongoose');

const Post = require('./models/Post');

mongoose.connect('mongodb://127.0.0.1/educent_test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Post.find({
    title: 'baslik'
}, (err, post) => {
    console.log(err, post);
}); */

/* Post.findByIdAndUpdate('61d5a463b6c616d2b781c801',{
    title: 'BASLIK'
}, (err, post) => {
    console.log(err, post);
}); */

/* Post.findByIdAndDelete('61d5a463b6c616d2b781c801', (err,post)=> {
    console.log(err,post);
})
 */


Post.find({}, (err,post)=> {
    console.log(err, post);
})

/* 
Post.create({
    title: 'baslik',
    content: 'mesaj'
}, (err, post) => {
    console.log(err,post);
}); */