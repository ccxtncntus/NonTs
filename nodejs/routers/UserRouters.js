import express from 'express';
import * as UsersController from '../controllers/UsersController.js';
import authenToken from '../middleware/authenToken.js';
import isAdmin from '../middleware/isAdmin.js';
const router = express();
router.use(express.json());
// isAdmin;
router.get('/getUsers', authenToken, UsersController.getUsers);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

export default router;
