const Article = require("../models/article");

async function getArticles(req, res, next) {
  const articles = await Article.find();

  if (!articles) {
    return res.status(404).json({ message: "No Article Found" });
  }
  return res.status(200).json({ message: "Articles found", articles });
}

async function getLatestArticles(req, res, next) {
  const articles = await Article.find().sort({ updatedAt: -1 }).limit(6);

  if (!articles) {
    return res.status(404).json({ message: "No Article Found" });
  }
  return res.status(200).json({ message: "Latest Articles found", articles });
}

async function getArticle(req, res, next) {
  const artId = req.params.id;
  const article = await Article.findById(artId);

  if (!article) {
    return res.status(404).json({ message: "No article found" });
  }

  return res.status(200).json({ article });
}

async function createArticle(req, res, next) {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const article = new Article({ title, author, description, imageUrl });

  article
    .save()
    .then((result) => {
      console.log(result);
      if (result)
        return res.status(201).json({ message: "Article created succesfully" });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
}

async function updateArticle(req, res, next) {
  const artId = req.params.id;

  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const updatedArticle = await Article.findByIdAndUpdate(
    artId,
    { $set: { title, author, description, imageUrl } },
    { runValidators: true }
  );

  return res.status(200).json({ message: "Article updated", updatedArticle });
}

async function deleteArticle(req, res, next) {
  const artId = req.params.id;

  Article.findByIdAndDelete(artId)
    .then((result) => {
      if (result) return res.status(200).json({ message: "Article deleted" });
    })
    .catch((err) => {
      return res.status(400).json({ message: "trouble deleting article." });
    });
}

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  getLatestArticles,
};
