const mongoose = require('mongoose');
// exam scheması ekleme

const ExamSchema = new mongoose.Schema({
    soru: { type: String, required: true },
    dogruCevap: { type: String, required: true },
    yanlis1: { type: String, required: true },
    yanlis2: { type: String, required: true },
    yanlis3: { type: String, required: true },
    yanlis4: { type: String, required: true },
    ders: { type: String, required: true },
    eklenmeTarihi: { type: String, default: ()=> {
        const d = new Date();
        var tarih;
        tarih = d.getHours() + ':';
        tarih += d.getMinutes() + String.fromCharCode(160)+ String.fromCharCode(160);
        tarih += d.getDate() + '/';
        tarih += d.getMonth() + 1 + '/';
        tarih += d.getFullYear();
        return tarih;
    } }
});
// yapılan modulu app.js ve exam.js dosyalarına belirt. ayrıca html dosyasında form kısmında yaz. 
module.exports = mongoose.model('Exam', ExamSchema);