import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function login(req, res, next){
    try{
        const { email, password } = req.body;

        if (!email || !password){
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // 'info' will contain the error messages written in passport.js (like 'Password incorrect')
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: "Server error during login" });
            }

            if (!user) {
                return res.status(401).json({ message: info?.message || "Login failed" });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Session creation failed" });
                }
                
                return res.status(200).json({ 
                    message: "Logged in successfully!", 
                    user: { id: user.id, email: user.email } 
                });
            });
        })(req, res, next); 
        // when we call passport.authenticate inside a function,
        // passport returns a function. So, we have to use (req, res, next) here to execute it. 
    }
    catch(err){
        return res.status(500).json({ message: 'Server error occured' });
    }
}

export default login;