import UserInfos from "../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth";
import BookInfos from "../models/book"
import TourInfos from "../models/tour"

class UserController {

    //Create user in db

    static async createUser(req, res) {
        
        const hashPassword= bcrypt.hashSync(req.body.password,10);
        req.body.password= hashPassword;

        const user = await UserInfos.create(req.body);
        if (!user) {
            return res.status(404).json({ error: "user not registred" });
        }
        return res
            .status(200)
            .json({ message: "User created successfully", data: user });
    }

    //get all users

    static async getAllUsers(req, res) {
        const users = await UserInfos.find();
        if (!users) {
            return res.status(404).json({ error: "users not successfully retrieved" });
        }
        return res
            .status(200)
            .json({ message: "Successfully retrieved users", data: users });
    }

    // getone user

    static async getOneUser(req, res) {
        const user = await UserInfos.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        return res
            .status(200)
            .json({ message: "User found successfully", data: user });
    }

    // delete user

    static async deleteOneUser(req, res) {
        const user = await UserInfos.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "user not deleted" });
        }
        return res
            .status(200)
            .json({ message: "User deleted successfully", data: user });
    }

    // log in function

    static async userLogin(req,res){
        const user = await UserInfos.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({ error: "user not found, kindly register first!"})
        }

        if(bcrypt.compareSync(req.body.password,user.password)){
            user.password=null;
            const token=TokenAuth.tokenGenerator({user:user});

            return res.status(200).json({message: "successfully logged in",token:token});
        }

        return res.status(400).json({error: "Password is wrong"});
    }
    // Booking functions

    static async bookTour (req,res){
        const bookData={
            user: req.user._id,
            tour:req.params.id
        };
        const book = await BookInfos.create(bookData);

        const tour = await TourInfos.findById(req.params.id);
        const tourSeats = tour.seats-1;
        await TourInfos.findByIdAndUpdate(req.params.id,{seats: tourSeats});

        if (!book) {
            return res.status(404).json({error: "Failed to book"});
        }

        return res.status(200).json({message: "Booked successfully", data: book})
    }

    // Get all bookings 

    static async getAllBooks(req, res) {
        const book = await BookInfos.find();
        if (!book) {
            return res.status(404).json({ error: "Bookings not successfully retrieved" });
        }
        return res
            .status(200)
            .json({ message: "Successfully retrieved bookings", data: book});
    }

    static async getAllBookingsByTourId(req,res) {
        const books = await BookInfos.find({tour:req.params.idtour});

        if (!books){
            return res.status(404).json({error: "not found"});
        }
        return res
        .status(200)
        .json({ message: "Found successfully ", data: books});
    }

    static async getAllBookingsByUserId(req,res) {
        const books = await BookInfos.find();

        if (!books){
            return res.status(404).json({error: "book not found"});
        }
        return res
        .status(200)
        .json({ message: "Found successfully ", data: books});

    }
    
}
export default UserController;