import {check, validationResult } from "express-validator";
import { isNumber } from "util";

class Validator{
    static validateInput=(req,res,next)=>{
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            const errorMessage= errors.errors.map((err)=> err.msg);
            return res.status(400).json({message: errorMessage});
        }
        
        return next();
    };

    static newAccountRules(){
        return[
            check("email","email is invalid").trim().isEmail(),
            check("password","password is not strong").trim().isStrongPassword(),
            check("lastName","Last name should be valid").trim().isAlpha(),
            check("firstName","First name should be valid").trim().isAlpha(),
            check("gender", "Gender should be valid among male, female,other,not-say",).trim().isIn(["male","female","other","not-say"]),
        ];
    }
    static newAccountTourRules(){
        return[
            check("title","title is invalid").trim().isAlpha(),
            check("description","no description").trim().isString(),
            check("seatsAvailable","Seats available must be numbers").trim().isNumeric(),
            check("dateScheduled","DateScheduled is invalid").trim().isDate(),
            check("dueDate","Date is not valid").trim().isDate(),
            check("price","price is not valid").trim().isNumeric()

        ]
    }
}
export default Validator;