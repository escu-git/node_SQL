const express = require('express');
const productDB = require('../Controllers/db.js');
const appRouter = express.Router();
const productCRUD = require('../Controllers/products_crud.js')



appRouter.get('/home', async(req, res)=>{
    const productos = await productDB.readAll('products', "*");
    try{
    if(productos.length != 0) {
        res.render('main', {products: productos, exist:true})
    }else{
        res.render('main', {exist:false})
    }
    }catch(err){
        res.status(400).json({error:err})
    }
})

appRouter.get('/productos/listar/:id?', productCRUD.list);

appRouter.post('/productos/guardar', productCRUD.create);

appRouter.delete('/productos/delete/:id', productCRUD.erase)

appRouter.put('/productos/update/:id', productCRUD.update)


module.exports = {appRouter}