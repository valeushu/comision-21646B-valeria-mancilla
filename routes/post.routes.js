const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");

router.post("/crear", postCtrl.createPost);

module.exports = router;
