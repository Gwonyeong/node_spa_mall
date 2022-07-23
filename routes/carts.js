const express = require('express')
const Goods = require('../schemas/goods')

const Carts = require('../schemas/cart')
const router = express.Router();

router.get('/goods/cart', async (req,res)=>{
    const carts = await Carts.find();
    const goodsIds = carts.map((cart) =>cart.goodsId);

    const goods = await Goods.find({ goodsId : goodsIds});



    res.json({
        carts: carts.map((cart) => {
            return {
                quantity: cart.quantity,
                goods : goods.find((item) => {
                    return item.goodsId === cart.goodsId;
                })
            };
        })
    })
    
   
})

module.exports = router