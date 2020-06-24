
const router = require('express').Router();
const postController = require('./controllers/post');
const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user');
const multer = require('multer');
const upload = multer();

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

router.post('/createPost', postController.createPost);
router.delete('/deletePost/:id', postController.deletePost);
router.get('/getAllPosts', postController.getAllPosts);
router.post('/createComment', postController.createComment);
router.post('/upload',upload.single("file"), userController.createUpload);

module.exports = router;