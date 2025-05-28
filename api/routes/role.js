import express from 'express';

import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js';

const router = express.Router();

// create a new role in DB
router.post('/create', createRole);

// update a role in DB
router.put('/update/:id', updateRole);

// get all roles from DB
router.get('/get-all-roles', getAllRoles);

// delete a role from DB
router.delete('/delete-role/:id', deleteRole);


export default router;