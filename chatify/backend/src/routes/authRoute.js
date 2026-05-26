import express from 'express'

const router = express.Router();

router.post('/signup',(req,res)=>{
    res.send("user signup")
})
router.post('/login',(req,res)=>{
    res.send("user login");
})
router.post('/logout',(req,res)=>{
    res.send("user logout");
})

export default router;