import express from 'express';
import passport from 'passport';

import '../middlewares/auth';

import { google, linkGoogle, unlinkGoogle, facebook, linkFacebook, unlinkFacebook } from '../controllers/auth';

const router = express.Router();

router.post('/google', passport.authenticate('google', { session: false }), google);
router.post('/facebook', passport.authenticate('facebook', { session: false }), facebook);
router.post('/link/google', passport.authenticate('jwt', { session: false }), passport.authorize('google', { session: false }), linkGoogle);
router.post('/link/facebook', passport.authenticate('jwt', { session: false }), passport.authorize('facebook', { session: false }), linkFacebook);
router.post('/unlink/google', passport.authenticate('jwt', { session: false }), unlinkGoogle);
router.post('/unlink/facebook', passport.authenticate('jwt', { session: false }), unlinkFacebook);

export default router;
