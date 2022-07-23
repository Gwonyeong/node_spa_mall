const express = require('express')
const Goods = require('../schemas/goods.js')
const Cart = require('../schemas/cart')
const router = express.Router();

router.get("/", (req, res) => {
    res.send('this is root page')
})
// api/goods
router.get('/goods', async (req, res) => {
    const { category } = req.query;

    console.log('category : ' , category)
    
    const goods = await Goods.find({ category })

    res.json({
        'goods': goods
    })
})

router.get('/goods/:goodsId', async (req, res) => {
    const { goodsId } = req.params;

    const [goods] = await Goods.find({ goodsId: Number(goodsId) })

    res.json({
        goods:goods
    })

})
router.post('/goods/:goodsId/cart', async (req, res)=> {
    const { goodsId } = req.params;
    const {quantity} = req.body;

    const exitstCarts = await Cart.find({goodsId : Number(goodsId)});

    if(exitstCarts.length){
        return res.status(400).json({success : false, errorMessage: '이미 장바구니에 들어있는 상품입니다.'})
    }

    await Cart.create({goodsId: Number(goodsId), quantity})
    res.json({success: true})


})

router.delete("/goods/:goodsId/cart",async (req, res) => {
    const { goodsId } = req.params;
    

    const exitstCarts = await Cart.find({goodsId : Number(goodsId)});

    if(exitstCarts.length){
        await Cart.deleteOne({ goodsId : Number(goodsId)})
    }

   
    res.json({success: true})
})

router.put("/goods/:goodsId/cart", async (req, res)=> {
    const{ goodsId } = req.params;
    const { quantity} = req.body;

    if(Number(quantity) <1){
        return res.status(400).json({success : false, errorMessage: "올바른 값을 입력하세요."})
    }

    const exitstCarts= await Cart.find({ goodsId: Number(goodsId)})
    if ( !exitstCarts.length){
        await Cart.create({goodsId: Number(goodsId), quantity})

    }else{
        await Cart.updateOne({ goodsId: Number(goodsId)}, {$set: {quantity}})
    }
    
    res.json({success : true})
})

router.post('/goods', async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });
    if (goods.length) {
        return res.status(400).json({ success: false, errorMessage: '이미 있는 데이터입니다.' })
    }

    await Goods.create({ goodsId, name, thumbnailUrl, category, price })

    res.json({ goods });
})

module.exports = router;