require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport-config"); // Updated to use config file
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Article = require("./models/article");
const Forum = require("./models/forum");
const QuestionAndAnswer = require("./models/questionsAndAnswers");
const IslamicQuote = require("./models/islamicQuote");
const DuaRequest = require("./models/duaRequest");
const VolunteerOpportunity = require("./models/volunteerOpportunity");
const VolunteerApplication = require("./models/volunteerApplication");
const Donation = require("./models/donation");

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connection Successful"))
  .catch((e) => console.log("error: ", e));

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection Error : ")
);
mongoose.connection.once("open", () => {
  console.log("Database connected!");
});

const app = express();

// Cors
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://salam2-five.vercel.app",
      "http://localhost:3000",
      "http://localhost:5174",
      "https://salam-phi.vercel.app",
    ],
    credentials: true, // Important: allow credentials (cookies, authorization headers)
  })
);
// Allows express to accept Json data
app.use(express.json());

// Configuring Express Session
app.use(
  session({
    secret: "ALLAHU AKBAR - SalamSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true if you are using https
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

const articlesRouter = require("./routes/articles");

app.use("/articles", articlesRouter);

const forumsRouter = require("./routes/forums");

app.use("/forums", forumsRouter);

const questionsAndAnswersRouter = require("./routes/questionsAndAnswers");

app.use("/questions_and_answers", questionsAndAnswersRouter);

const newsletterRouter = require("./routes/newsletter");

app.use("/newsletter", newsletterRouter);

const islamicQuotesRouter = require("./routes/islamicQuotes");

app.use("/islamic-quotes", islamicQuotesRouter);

const resourcesRouter = require("./routes/resources");

app.use("/resources", resourcesRouter);

const duaRequestsRouter = require("./routes/duaRequests");

app.use("/dua-requests", duaRequestsRouter);

const volunteerOpportunitiesRouter = require("./routes/volunteerOpportunities");

app.use("/volunteer-opportunities", volunteerOpportunitiesRouter);

const volunteerApplicationsRouter = require("./routes/volunteerApplications");

app.use("/volunteer-applications", volunteerApplicationsRouter);

const donationsRouter = require("./routes/donations");

app.use("/donations", donationsRouter);

const authRouter = require("./routes/auth");

app.use("/api/auth", authRouter);

module.exports = app;
