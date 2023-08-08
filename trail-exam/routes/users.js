const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();

const Users = require('../models/Users'); // veri tabanını ekleme

// user yönlendirmeleri
// routers.get lerde burda yazılır ancak error sayfası yüzünden diğer kısma yazdım

router.post('/register', (req, res) => {
    Users.create(req.body, (err, user) => {
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'kaydınız başarılı bir şekilde oluşturuldu'
        }
        res.redirect('/users/login');
    });
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    Users.findOne({email}, (err, user) => {
        if(user){
            if(user.password == password){
                req.session.userId = user._id;
                res.redirect('/');
            }else{
                res.redirect('/users/login');
            } 
        } else {
            res.redirect('/users/register');
        }
    })
});


module.exports = router;