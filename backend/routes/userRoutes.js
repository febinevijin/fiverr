import express from 'express';

import { test } from '../controller/userController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/test").get( verifyUser, test);

export default router;