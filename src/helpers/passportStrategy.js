import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            const user = await User.query().findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            if (!user.verifyPassword(password)) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            return done(null, user);
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.query().findById(id)
        .then((user) => done(null, user))
        .catch((error) => done(error));
});

export default passport;
