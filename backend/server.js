import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import routeHandler from './routes/routeHandler.js';
import initializePassport from "./config/passport.js";
import "./controllers/wardEscalationWorker.js";
import "./controllers/emailDeliveryWorker.js";

const app = express();
const port = process.env.PORT || 5001;
dotenv.config();

const frontendOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({
    origin: frontendOrigins,
    credentials: true
}));

app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction
    }
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routeHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});