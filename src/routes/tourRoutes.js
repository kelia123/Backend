import express from "express";
import TourController from "../controllers/tourcontroller";
import Validator from "../middlewares/validator";
import VerifyToken from "../middlewares/verifytoken";
import VerifyAccess from "../middlewares/verifyaccess"

const tourRouter = express.Router();

tourRouter.post("/create", VerifyToken,VerifyAccess("admin"),
Validator.newAccountTourRules(),
Validator.validateInput, 
TourController.createTour);

tourRouter.get("/getall", TourController.getAllTours);
tourRouter.get("/:id",TourController.getOneTour);
tourRouter.delete("/:id",TourController.deleteOneTour);

export default tourRouter;