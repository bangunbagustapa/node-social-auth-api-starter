import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-token';
import FacebookStrategy from 'passport-facebook-token';

import User from '../models/user';

passport.use('google', new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const { _json: { name, email } } = profile;

    try {
      /*
      In this if statement block, we'll check if the user
      made a request to link their account to Google
      */
      if (req.user) {
        const googleAlreadyRegistered = await User.findOne({ 'account.google.email': email });

        if (googleAlreadyRegistered) {
          return done({ message: 'Google account already linked' });
        }

        req.user.account.google.email = email;

        await req.user.save();

        return done(null, req.user);
      }

      const googleUser = await User.findOne({ 'account.google.email': email });

      if (googleUser) {
        return done(null, googleUser);
      }

      /*
      This if statement block is to merge the account. We check using
      another social account. If email from another social account
      is the same as Google email, merge the account
      */
      const user = await User.findOne({ 'account.facebook.email': email });

      if (user && !user.account?.google?.email) {
        user.account.google.email = email;

        await user.save();

        return done(null, user);
      }

      const newUser = new User({
        name,
        account: {
          google: {
            email,
          },
        },
      });

      await newUser.save();

      return done(null, newUser);
    } catch (err) {
      return done(err, false);
    }
  },
));

passport.use('facebook', new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const name = profile.displayName;
    const email = profile.emails[0].value;

    try {
      /*
      In this if statement block, we'll check if the user
      made a request to link their account to Facebook
      */
      if (req.user) {
        const facebookAlreadyRegistered = await User.findOne({ 'account.facebook.email': email });

        if (facebookAlreadyRegistered) {
          return done({ message: 'Facebook account already linked' });
        }

        req.user.account.facebook.email = email;

        await req.user.save();
        return done(null, req.user);
      }

      const facebookUser = await User.findOne({ 'account.facebook.email': email });

      if (facebookUser) {
        return done(null, facebookUser);
      }

      /*
      This if statement block is to merge the account. We check using
      another social account. If email from another social account
      is the same as Facebook email, merge the account
      */
      const user = await User.findOne({ 'account.google.email': email });

      if (user && !user.account?.facebook?.email) {
        user.account.facebook.email = email;

        await user.save();

        return done(null, user);
      }

      const newUser = new User({
        name,
        account: {
          facebook: {
            email,
          },
        },
      });

      await newUser.save();

      return done(null, newUser);
    } catch (err) {
      return done(err, false);
    }
  },
));

/*
This JWT strategy is not using cookie. Instead, it will send the token
in the JSON response. If you want to extract the JWT in a cookie,
create a custom extractor function with cookie-parser. Learn
more here http://www.passportjs.org/packages/passport-jwt
*/
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    passReqToCallback: true,
  },
  async (req, payload, done) => {
    try {
      const user = await User.findById(payload.sub);

      if (!user) {
        return done(null, false);
      }

      req.user = user;

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  },
));
