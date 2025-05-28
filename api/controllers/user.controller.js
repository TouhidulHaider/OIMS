import User from '../models/User.js';
import { createSuccess } from '../utils/success.js';
import { createError } from '../utils/error.js';

export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await User.find();
        return next(createSuccess(200, "Users fetched successfully!", users));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const getUser = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(createError(404, "User not found!"));
        }   
        return next(createSuccess(200, "User fetched successfully!", user));        
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}
