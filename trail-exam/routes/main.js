const express = require('express');
const router = express.Router();

const Exam = require('../models/Exam');

// ana yönlendirmeler

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('site/index');
});

router.get('/contact', (req, res) => {
    res.render('site/contact');
});

router.get('/users/login', (req, res) => {
    res.render('site/login');
});

router.get('/users/newPassword', (req, res) => {
    res.render('site/newpassword');
});

router.get('/about', (req, res) => {
    res.render('site/about');
});

router.get('/users/register', (req, res) => {
    res.render('site/register');
});

router.get('/exam/newQuestion', (req, res) => {
    if(req.session.userId){
        return res.render('site/addquestion');
    }
        res.redirect('/users/login');
    
});

router.get('/exam/test', (req, res) => {
    Exam.find({}).lean().then(exam => {
        res.render('site/exam', {
            exam:exam
        });
    }) 
});

router.get('/exam/all', (req, res) => {
    Exam.find({}).lean().then(exam => {
        res.render('site/allquestion', {
            exam:exam
        });
    }) 
});
/*
router.get('/:id', (req, res) => {
    Exam.findById(req.params.id).lean().then(exam => {
        res.render('site/exam', {
            exam:exam
        });
    }) 
});
*/
router.get('/users/logout', (req, res) => {
    req.session.destroy(()=> {
        res.redirect('/');
    })
});


router.get('*', (req, res) => {
        res.status(404).render('site/error');
});

module.exports = router;