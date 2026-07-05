import express from 'express'
import { getNotes,createNotes ,updateNotes,deleteNotes,getSpecificNote} from '../controller/notesController.js'

const router = express.Router();

router.get('/' , getNotes);
router.get('/:id',getSpecificNote)
router.put('/:id',updateNotes);
router.post('/add',createNotes);
router.delete('/:id',deleteNotes);


export default router;