import express from "express";
import TourController from "../controllers/tourcontroller";
import Validator from "../middlewares/validator";

const tourRouter = express.Router();

tourRouter.post("/create",Validator.newAccountTourRules(),Validator.validateInput, TourController.createTour);
tourRouter.get("/getall", TourController.getAllTours);
tourRouter.get("/:id",TourController.getOneTour);
tourRouter.delete("/:id",TourController.deleteOneTour);

export default tourRouter;