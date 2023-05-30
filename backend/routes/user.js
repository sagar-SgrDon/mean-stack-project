const express = require("express");
const userControllers = require("../controllers/users");
const router = express.Router();

router.post("/login", userControllers.getUser);

router.post("/signup", userControllers.createUser);

module.exports = router;
