import Role from '../models/Role.js';
import { createSuccess } from '../utils/success.js';
import { createError } from '../utils/error.js';

const createRole = async (req, res, next)=>{
    try{
        if(req.body.role && req.body.role !==''){
            const newRole = new Role(req.body);
            await newRole.save();
            return next(createSuccess(200, "Role created successfully!", newRole));
        }else{
            return next(createError(400, "Bad request"));
        }
    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }
}

const updateRole = async (req, res, next)=>{
    try {
        const role = await Role.findById({_id: req.params.id});
        if(role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id, 
                {$set: req.body}, 
                {new: true}
            );
            return next(createSuccess(200, "Role updated!", newData));
        }else{
            return next(createError(404, "Role not found"));
        }
    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }
}

const getAllRoles = async (req, res, next)=>{
    try {
        const roles = await Role.find({});
        return next(createSuccess(200, "Roles fetched successfully!", roles));
    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }
}

const deleteRole = async (req, res, next)=>{
    try {
        const roleId = req.params.id;
        const role = await Role.findById({_id: roleId});
        if(role){
            await Role.findByIdAndDelete(roleId);
            return next(createSuccess(200, "Role deleted!", role));
        }else{
            return next(createError(404, "Role not found"));
        }
    } catch (error) {
        console.log(error);
        return next(createError(500, "Internal Server Error!"));
    }
}

export { createRole, updateRole, getAllRoles, deleteRole };
