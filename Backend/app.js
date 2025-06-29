import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import shortUrl from "./src/routes/shortUrl.route.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

import path from "path";
import { fileURLToPath } from "url";

dotenv.config("./.env");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: 'https://urlshortner-jet.vercel.app', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser)

// app.get("/", function (req, res) {
//     res.send("Your URL - Shortner, Home Page...");
// })
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrl);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on 5000 - http://localhost:5000");
});