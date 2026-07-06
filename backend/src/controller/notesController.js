import {Note} from '../model/notesModel.js'
export const getNotes = async (_,res) =>{
   try{
    const notes = await Note.find().sort({ createdAt:-1 });//newest one
    res.status(200).json(notes);
   }catch(err){
    res.status(500).json({message:"Internal server error."});
   }
}

export const createNotes = async (req,res) =>{
    try{
 const{title,content} = req.body;
    const note = new Note({title,content});
    const notes = await note.save();
    res.status(201).json({notes});
    }catch(err){
    res.status(500).json({message:"Internal server error."});
   }
   
}

export const updateNotes = async (req,res) =>{
    try{
        const{title,content} = req.body;
        const updatednote = await Note.findByIdAndUpdate(req.params.id,{title,content},{returnDocument:'after'});
        if(!updatednote){
            return res.status(404).json({msg:"Note not found"});
        }
         res.status(200).json({updatednote});
    }catch(err){
    res.status(500).json({message:"Internal server error."});
   }
   
}

export const deleteNotes =async (req,res) =>{
    try{
       const deleted = await Note.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({msg:"Note not found"});
        }
         res.status(200).json({msg:"Notes deleted successfully"});
    }catch(err){
    res.status(500).json({message:"Internal server error."});
   }
   
}

export const getSpecificNote = async (req,res) =>{
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({msg:"Note not found"});
        }
        res.status(200).json(note);
    }catch(err){
         res.status(500).json({message:"Internal server error."});
    }
}