import express from "express";
import UserController from "../controllers/userController";
import Validator from "../middlewares/validator";
import DataChecker from "../middlewares/datachecker"
import VerifyToken from "../middlewares/verifytoken"
import VerifyAccess from "../middlewares/verifyaccess"

const userRouter = express.Router();

userRouter.post("/register", DataChecker.isEmailExist, Validator.newAccountRules(), Validator.validateInput, UserController.createUser);
userRouter.post("/login", UserController.userLogin);
userRouter.get("/all", UserController.getAllUsers);


// booking paths 


userRouter.get("/book/all", UserController.getAllBooks);

userRouter.get("/books/all", VerifyToken, VerifyAccess("user"), UserController.getAllBookingsByUserId);

userRouter.get("/profile/:id", UserController.getOneUser);
userRouter.delete("/profile/:id", UserController.deleteOneUser);
userRouter.get("/books/:idtour", VerifyToken, VerifyAccess("admin"), UserController.getAllBookingsByTourId);
userRouter.post("/book/:id", VerifyToken, VerifyAccess("user"), UserController.bookTour);

export default userRouter;