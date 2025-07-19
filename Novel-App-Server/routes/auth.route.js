import express from 'express';
import {signIn} from "../controllers/auth.controller";

const app = express();

app.routes('/api/auth', signIn);

export default authRoute;