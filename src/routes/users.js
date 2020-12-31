import express from 'express';
import passport from 'passport';

import { validate } from '../middlewares/validation';
import '../middlewares/auth';

import { getUser, updateUser, deleteUser } from '../controllers/users';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUser);
router.put('/', validate('update-user'), passport.authenticate('jwt', { session: false }), updateUser);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteUser);

export default router;
