const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();

let objMulter = multer({dest:'./public/upload'});
app.use(objMulter.any());

app.use(express.static('./public'));

app.post('/api/reg',(req, res) => {
    let oldName = req.files[0].path;
    console.log(oldName)
    let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    console.log(newName)
    fs.renameSync(oldName, newName);
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({
        err:0,
        url:
            'http://localhost:8080/upload/' + 
            req.files[0].filename +
            path.parse(req.files[0].originalname).ext
    });
});

app.listen(8080,()=>{
    console.log('服务器启动成功');
})