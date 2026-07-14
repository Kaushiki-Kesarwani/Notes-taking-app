import express from 'express'
import { getNotes,createNotes ,updateNotes,deleteNotes} from '../controller/notesController.js'
import {protect} from "../middleware/auth.middleware.js"

const router = express.Router();

router.get('/',protect, getNotes);
router.put('/:id',protect,updateNotes);
router.post('/add',protect,createNotes);
router.delete('/:id',protect,deleteNotes);


export default router;