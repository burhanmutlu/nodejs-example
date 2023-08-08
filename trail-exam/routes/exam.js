const express = require('express');
const router = express.Router();

const Exam = require('../models/Exam'); // veri tabanını ekleme

// user yönlendirmeleri
// routers.get lerde burda yazılır ancak error sayfası yüzünden diğer kısma yazdım

router.post('/test', (req, res) => {
    Exam.create(req.body,(err,post)=> {
        console.log(`hata: ${err}`);
    });
    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'sorunuz başarılı bir şekilde eklendi'
    }

    res.redirect('/exam/test');
});

router.post('/all', (req, res) => {
    Exam.create(req.body,(err,post)=> {
        console.log(`hata: ${err}`);
    });
    
    res.redirect('/');
});

module.exports = router;