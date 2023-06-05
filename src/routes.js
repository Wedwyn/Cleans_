import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Model } from 'objection';
import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Feedback from './models/Feedback.js';
import { knexConfig } from '../knexfile.js';
import 'dotenv/config';
import passportStrategy from './helpers/passportStrategy.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: true,
        saveUninitialized: true,
    }),
);
app.use(passportStrategy.initialize());
app.use(passportStrategy.session());

const mode = process.env.NODE_ENV || 'development';
// const mode = 'production';

Model.knex(knex(knexConfig[mode]));

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        res.locals.isAuthenticated = true;
    } else {
        res.locals.isAuthenticated = false;
    }
    next();
});

const sessionRouter = express.Router();

sessionRouter
    .get('/', async (req, res) => {
        if (res.locals.user) {
            console.log(res.locals.user.username);
            res.render('index', { username: res.locals.user.username });
        } else {
            res.render('index', { username: 'none' });
        }
    })
    .get('/admin', async (req, res) => {
        const feedbacks = await Feedback.query();
        console.log(feedbacks);
        res.render('AdminPanel', { feedbacks });
    })
    .get('/profile', async (req, res) => {
        res.render('profile');
    })
    .post('/session', async (req, res) => {
        console.log('-----body-------');
        console.log(req.body);
        console.log('------------------here------------------');
        const user = await User.query().findOne({ email: req.body.email });
        req.logIn(user, (err) => {
            if (err) {
                res.redirect('/');
            }
            res.locals.user = req.user;
            res.redirect('/');
        });
    })
    .post('/feedback', async (req, res) => {
        console.log(req.body);
        let rating = '';
        for (const key in req.body) {
            if (req.body[key] === 'on') {
              rating = key;
            }
        }
        rating = rating.slice(-1);
        const newFeedback = {
            username: res.locals.user.username,
            text: req.body.text,
            rating: Number(rating),
        }
        await Feedback.query().insert(newFeedback);
        res.redirect('/');
    })
    .post('/users', async (req, res) => {
        console.log(req.body);
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        await User.query().insert(newUser);
        res.redirect('/');
    })
    .get('/feedback/delete/:id', async (req, res) => {
        const { id } = req.params;
        await Feedback.query().deleteById(id);
        res.redirect('/admin');
    })
    .get('/session/delete', (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    });

app.use('/', sessionRouter);

export default app;
