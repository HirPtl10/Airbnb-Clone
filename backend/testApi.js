let express = require("express");
let router = express.Router();
let Listing = require("./models/listings");

router.get("/", async (req, res, next) => {
    res.send("test")
})

module.exports = router;