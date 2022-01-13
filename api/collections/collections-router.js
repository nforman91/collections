const router = require("express").Router();
// const collections = require('./collections-data');
const Collections = require("./collections-model");
const { tokenRestricted } = require("../auth/auth-middlware");

router.get("/", tokenRestricted, (req, res, next) => {
  // res.status(200).json(collections);
  Collections.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:user_id", tokenRestricted, (req, res, next) => {
  Collections.findById(req.params.user_id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;
