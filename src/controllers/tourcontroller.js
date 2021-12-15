import tour from "../models/tour";
import TourInfos from "../models/tour";

class TourController {

    //Create tour in db

    static async createTour(req, res) {

        const tour = await TourInfos.create(req.body);

        if (!tour) {
            return res.status(404).json({ error: "tour not registred" });
        }

        return res
            .status(200)
            .json({ message: "Tour created successfully", data: tour });
    }


    //get all tours

    static async getAllTours(req, res) {

        const tours = await TourInfos.find();

        if (!tours) {
            return res.status(404).json({ error: "Tours not successfully retrieved" });
        }

        return res
            .status(200)
            .json({ message: "Successfully retrieved tours", data: tours });
    }

    // get one tour
    static async getOneTour(req, res) {

        const tour = await TourInfos.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({ error: "user not found" });
        }

        return res
            .status(200)
            .json({ message: "user found successfully", data: tour });
    }


    // delete one tour

    static async deleteOneTour(req, res) {

        const tour = await TourInfos.findByIdAndDelete(req.params.id);

        if (!tour) {
            return res.status(404).json({ error: "user not deleted" });
        }

        return res
            .status(200)
            .json({ message: "user deleted successfully", data: tour });
    }

}

export default TourController;