import express from "express";
import signup from "./auth/signup.js";
import login from "./auth/login.js";
import issuesDisplay from "./map/issuesDisplay.js";
import reportIssue from "./form/reportIssue.js";
import issueController from "../controllers/issueController.js";
import clubbedIssuesDisplay from "./issues/clubbedIssuesDisplay.js";
import emailsDisplay from "./admin/emailsDisplay.js";
import emailsApprove from "./admin/emailsApprove.js";
import emailsReject from "./admin/emailsReject.js";
import resolveIssue from "./issues/resolveIssue.js";

import isUserLoggedIn from "../middleware/auth/isUserLoggedIn.js";
import isAdmin from "../middleware/auth/isAdmin.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/issuesDisplay', isUserLoggedIn, issuesDisplay);
router.post('/reportIssue', isUserLoggedIn, issueController);
router.get('/clubbedIssuesDisplay', isUserLoggedIn, clubbedIssuesDisplay);
router.post('/resolveIssue/:issueId', isUserLoggedIn, resolveIssue);

router.get('/admin/emailsDisplay', isUserLoggedIn, isAdmin, emailsDisplay);
router.post('/admin/emailsDisplay/:id/approve', isUserLoggedIn, isAdmin, emailsApprove);
router.post('/admin/emailsDisplay/:id/reject', isUserLoggedIn, isAdmin, emailsReject);

export default router;