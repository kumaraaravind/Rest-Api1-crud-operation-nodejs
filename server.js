const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const BrandName = require('./db_Model/model');

mongoose.connect('mongodb://0.0.0.0:27017/userdb')
.then(()=> console.log('db connected'))
.catch((e)=> console.log(e))

app.post('/addbrands', async(req, res)=>{
    const {brandname} = req.body;
    console.log(brandname)
    try {
        const newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find())
    } catch (error) {
        console.log (error.message);
    }
});

app.get('/getallbrands', async(req, res)=>{
    try {
        const allData = await BrandName.find();
        return res.json(allData);
        
    } catch (error) {
        console.log(error,message);
    }
})

app.get('/getallbrands/:id', async(req, res)=>{
    try {
        const Data = await BrandName.findById(req.params.id);
        return res.json(Data);
        
    } catch (error) {
        console.log(error.message);
    }
});

app.delete('/deletebrand/:id', async(req, res)=>{
    try {
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find())

    } catch (error) {
        console.log(error.message);
    }
})


app.listen(3000,()=>console.log('server runing'))