var express = require('express');
var router = express.Router();
const productSchema = require('../models/product')

router.post('/product', async (req, res) => {
    const { name, price, stock } = req.body;
  
    try {
      const newProduct = await productSchema.create({ name, price, stock });
      console.log("askddajdldasjdlkaldkasdk",newProduct)

      await newProduct.save();
      return res.status(201).send({
      "status": 201, 
      "massage": "success", 
      "data": [newProduct]
      })
      // .save();
    } catch (error) {
      return res.status(500).send({
        "status": 500, 
        "massage": "success", 
        "data": null
        })
    }
  });

  router.get('/product', async (req, res) => {
    try {
      const Product = await productSchema.find({ });
      return res.status(201).send({
      "status": 201, 
      "massage": "success", 
      "data": [Product]
      })
      
    } catch (error) {
      return res.status(500).send({
        "status": 500, 
        "massage": "success", 
        "data": null
        })
    }
  });

  router.get('/product/:id', async (req, res,next) => {
  
    try {
      const{id}=req.params;
      const Product = await productSchema.findById({id});
      if(!Product){
        return res.status(400).send({
          "status": 400, 
          "massage": "ไม่พบสินค้านี้", 
          "data": [Product]
          })
      }
      return res.status(201).send({
      "status": 201, 
      "massage": "success", 
      "data": [Product]
      })
      
    } catch (error) {
      return res.status(500).send({
        "status": 500, 
        "massage": "success", 
        "data": null
        })
    }
  });

  router.put('/product/:id', async (req, res) => {
    const{id}=req.params;
    const { name, price, stock } = req.body;
  
    try {
      const Product = await productSchema.findByIdAndUpdate(
        id,
        { name, price, stock },
        { new: true, runValidators: true }
      );
      if (!Product) {
        return res.status(404).send({ message: "ไม่พบสินค้า" });
      }
      res.status(201).send({
        status: 201,
        message: "อัปเดตสินค้าสำเร็จ",
        data: [Product],
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        status: 500,
        message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์",
        data: null,
      });
    }
  });

  router.delete('/product/:id', async (req, res) => {
    const{id}=req.params;
    try {
      const Product = await productSchema.findByIdAndDelete(id);
      if (!Product) {
        return res.status(404).send({ message: "ไม่พบสินค้า" });
      }
      res.status(201).send({
        status: 201,
        message: "ลบรายการสำเร็จ",
        data: [],
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        status: 500,
        message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์",
        data: null,
      });
    }
  });

  module.exports = router;