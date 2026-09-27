const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({
  storage,
});

router
  .route("/")
  .get(
    // INDEX - show all listings
    wrapAsync(listingController.index),
  )
  .post(
    // CREATE - create listing
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );

// NEW - show form
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(
    // SHOW - show one listing
    wrapAsync(listingController.showListing),
  )
  .put(
    // UPDATE
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(
    // DELETE
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing),
  );

// EDIT - show edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
