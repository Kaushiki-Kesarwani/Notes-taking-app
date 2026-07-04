import express from 'express'
import { getNotes,postNotes ,putNotes,deleteNotes} from '../controller/notesController.js'

const router = express.Router();

router.get('/' , getNotes);
router.put('/:id',putNotes);
router.post('/add',postNotes);
router.delete('/remove',deleteNotes);


export default router;