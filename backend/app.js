const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { data } = require("../frontend/data.js");
const path = require("path");
const testApiRouter = require("./testApi.js");
const Listing = require("./models/listings.js");
const methodOverride = require("method-override");
const Review = require("./models/review.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const ErrorHandler = require("./ErrorHandler.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
const schemaValidator = require("./schema_validation.js");
const Joi = require("joi");
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOptions = {
  secret: "thebestkeyintheworld",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

app.use(session(sessionOptions));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};
app.get("/greet", (req, res, next) => {
  let { name = "random" } = req.cookies;
  res.send(`Hi, ${name}`);
});

app.get(
  "/listings",
  wrapAsync(async (req, res, next) => {
    const listings = await Listing.find();
    res.json(listings);
  }),
);

app.put(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    let newData = req.body;
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler(400, "Listing not found"));
    }

    await Listing.findByIdAndUpdate(id, {
      ...newData,
      image: {
        url: newData.image,
      },
    });
    res.redirect(`http://localhost:5173/listing/${id}`);
  }),
);

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // clear session cookie
      res.redirect("http://localhost:5173/listings?success=Logged+out");
    });
  });
});
app.get(
  "/isloggedin",
  wrapAsync((req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({ loggedIn: true, user: req.user });
    } else {
      res.json({ loggedIn: false });
    }
  }),
);

app.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    const { email, username, password } = req.body;

    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) {
        console.log(err);
        return res.redirect(
          `http://localhost:5173/signup?error=Login+after+signup+failed`,
        );
      }
      res.redirect(
        `http://localhost:5173/listings?success=Registered+successfully`,
      );
    });
    res.redirect(`http://localhost:5173/signup?error=${err}`);
    return;
  }),
);

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: `http://localhost:5173/login?error=Check+your+username+and+password`,
  }),
  wrapAsync(async (req, res, next) => {
    const username = req.user.username;
    res.redirect(
      `http://localhost:5173/listings?success=Successfully+logged+in+${username}`,
    );
  }),
);

app.post(
  "/listing/:id/review",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler(400, "Listing not found"));
    }
    const listing = await Listing.findById(id);
    const newReview = new Review({
      comment: req.body.comment,
      rating: req.body.rating,
    });
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`http://localhost:5173/listing/${id}`);
  }),
);

app.get(
  "/listing/:id/getreview",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler(400, "Listing not found"));
    }
    const listing = await Listing.findById(id).populate("reviews"); // Optional: populate review details if needed
    res.json(listing.reviews || []);
  }),
);

app.delete(
  "/listing/:id/delete",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler(400, "Listing not found"));
    }
    await Listing.findByIdAndDelete(id);
    res.redirect("http://localhost:5173/listings");
  }),
);

app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler(400, "Listing not found"));
    }
    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    res.json(listing);
  }),
);

app.post(
  "/listings/new",
  wrapAsync(async (req, res, next) => {
    let data = req.body;

    console.log(req.body);

    let result = schemaValidator.validate(data);
    if (result.error) {
      console.log(result.error);
      return next(new ErrorHandler(500, "Listing information needed"));
    }
    let listing = new Listing({
      ...data,
      image: {
        url: data.image,
      },
    });
    await listing.save();
    let id = listing._id;
    res.redirect(`http://localhost:5173/listing/${id}`);
  }),
);

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use((err, req, res, next) => {
  let { status = 510, message = "Something went horibbly wrong" } = err;
  console.log("We are in error middleware");
  res.status(status).json({ msg: message });
});
const port = 5001;

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
