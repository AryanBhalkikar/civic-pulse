import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import routeHandler from './routes/routeHandler.js';
import initializePassport from "./config/passport.js";
import "./controllers/wardEscalationWorker.js";

const app = express();
const port = 5001;
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routeHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});