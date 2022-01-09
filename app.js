const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');


// mongodb bağlama
mongoose.connect('mongodb://127.0.0.1/educent_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true
});

//session için gerekli alanlar(kaydı veritabanına kaydetmek için)
app.use(expressSession({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: false },
    store: connectMongo.create({
        mongoUrl: 'mongodb://127.0.0.1/educent_db'
    })

}));
// bildirim yayınlamak için daha sonra bildirim silsin diye fonksiyon kullandık. next ise ilerlemeyi sağlar


//public klasörünü siteye açma
app.use(express.static('public'));

// handlebars enginesini ekleme
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// bodyparser için gerekli kodlar
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        res.locals = {
            displayLink: true
        }
    } else {
        res.locals = {
            displayLink: false
        }
    }
    next();
})

// bildirim yayınlamak için daha sonra bildirim silsin diye fonksiyon kullandık. next ise ilerlemeyi sağlar
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
})


// routes klasoru için gerekli olanlar (/users/...  users.js içindeki yönlendirmeler)
// class gibi düşünebilirsin. örn. kullanicilar/yenikullanici.aspx gibi 
const main = require('./routes/main');
const users = require('./routes/users');
const exam = require('./routes/exam');
app.use('/', main);
app.use('/users', users);
app.use('/exam', exam);

// sunucu çalıştırma
app.listen(port, hostname, () => {
    console.log(`Server Çalışıyor, http://${hostname}:${port}/`);
}); 