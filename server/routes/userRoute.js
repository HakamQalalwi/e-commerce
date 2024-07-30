const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validator/userValidator");

const {
  getUsers,
  craeteUser,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../services/userService");

const router = express.Router();
const authService = require("../services/authService");

router.use(authService.protect);

router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

router.use(authService.allowedTo("admin", "manager"));

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, craeteUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
