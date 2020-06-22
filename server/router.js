
const router = require('express').Router();
const authController = require('./controllers/auth');
const postController = require('./controllers/post');

router.post('/loginUser', authController.loginUser);

router.post('/registerUser', authController.registerUser);
// router.get('/', controller.login);
router.post('/createPost', postController.createPost);
router.delete('/deletePost/:id', postController.deletePost);
router.get('/getAllPosts', postController.getAllPosts);
router.post('/createComment', postController.createComment);

module.exports = router;