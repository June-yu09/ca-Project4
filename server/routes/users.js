const express = require('express');
const router = express.Router();

router.get('/test', (req, res)=>{
    res.send({ msg : 'test route' });
})

module.exports = router;