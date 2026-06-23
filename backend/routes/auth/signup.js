import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import pool from "../../config/db.js";

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function signup(req, res, next){
    try{
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password){
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0){
            return res.status(400).json({ message: 'Email already registered' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await pool.query(
            'INSERT INTO users (firstname, lastname, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)',
            [firstName, lastName, email, hashedPassword, false]
        );

        res.status(200).json({ message: 'User registered successfully!' });
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ message: 'Server error occurred' }); 
    }
}

export default signup;