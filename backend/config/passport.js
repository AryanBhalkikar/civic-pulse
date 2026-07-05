import express from "express";
import bodyParser from "body-parser";
import pool from "./db.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";

async function initializePassport(passport){
    passport.use(new Strategy({ usernameField: 'email' }, async function verify (email, password, cb){
        try{
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user){
                return cb(null, false, { message: 'Invalid email or password.' });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err){
                    return cb(err);
                }

                if (!result) {
                    return cb(null, false, { message: 'Invalid email or password.' });
                }

                return cb(null, user);
            });
        }
        catch(err){
            return cb(null, false, { message: 'Unable to verify credentials right now.' });
        }
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        try{
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            cb(null, result.rows[0]);
        }
        catch(err){
            cb(err);
        }
    });

    /* 
    Notes on deserialize user part:

    - The first parameter of deserializeUser is NOT the full user object. 
    It's only the ID.

    - We only store the id not the full user object because Sessions should be small. 
    Storing the full user object in every session would waste memory.

    - This function queries the database to fetch the full user object,
    passes the full user object to done(null, user),
    passport then attaches it to req.user.
    
    - Now, req.user can be accessed in your route handlers:
    
    */
}

export default initializePassport;