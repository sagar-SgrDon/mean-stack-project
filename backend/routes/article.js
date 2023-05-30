const express = require("express");

const router = express.Router();
const artController = require("../controllers/articles");

router.get("/latest", artController.getLatestArticles);

router.get("/", artController.getArticles);
router.get("/:id", artController.getArticle);

router.post("/", artController.createArticle);

router.patch("/:id", artController.updateArticle);

router.delete("/:id", artController.deleteArticle);

module.exports = router;
