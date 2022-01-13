const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenBuilder = require('../auth/token-builder');
const Collections = require('../collections/collections-model');
const { checkUsernamePasswordSent, checkUsernameFree } = require('./auth-middlware');

router.post('/register', checkUsernamePasswordSent, checkUsernameFree, (req, res, next) => {
    let user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
    Collections.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(next)
});

router.post('/login', checkUsernamePasswordSent, (req, res, next) => {
    let { username, password } = req.body;
    Collections.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = tokenBuilder(user)

                res.status(200).json({
                    message: `welcome, ${user.username}`,
                    token
                });
            } else {
                next({ status: 401, message: 'invalid credentials' });
            }
        })
        .catch(next);
});

module.exports = router;
