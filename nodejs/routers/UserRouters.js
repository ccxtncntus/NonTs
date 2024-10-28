import express from 'express';
import * as UsersController from '../controllers/UsersController.js';
import * as MailController from '../controllers/MailController.js';
import authenToken from '../middleware/authenToken.js';
import isAdmin from '../middleware/isAdmin.js';
const router = express();
router.use(express.json());
// isAdmin;
router.get('/getUsers', authenToken, UsersController.getUsers);
router.get('/getUsersCurent', authenToken, UsersController.getUsersCurent);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.post('/forgotpassword', UsersController.forgotPassword);
router.post('/checkRefeshToken', UsersController.checkRefeshToken);
router.patch('/changeForgotPassword', UsersController.changeForgotPassword);
router.post('/sendMail', MailController.send);

export default router;
