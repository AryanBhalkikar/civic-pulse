import express from "express";
import signup from "./auth/signup.js";
import login from "./auth/login.js";
import issuesDisplay from "./map/issuesDisplay.js";
import reportIssue from "./form/reportIssue.js";
import issueController from "../controllers/issueController.js";
import isUserLoggedIn from "../middleware/auth/isUserLoggedIn.js";
import clubbedIssuesDisplay from "./issues/clubbedIssuesDisplay.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/issuesDisplay', isUserLoggedIn, issuesDisplay);
router.post('/reportIssue', isUserLoggedIn, issueController);
router.get('/clubbedIssuesDisplay', isUserLoggedIn, clubbedIssuesDisplay);

export default router;