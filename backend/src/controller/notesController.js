import {Note} from '../model/notesModel.js'


export const getNotes = async (req,res) =>{
   try{
    const notes = await Note.find({ user: req.userId}).sort({ createdAt:-1 });//newest one
    res.status(200).json(notes);
   }catch(err){
    res.status(500).json({message:"Internal server error."});
   }
}

export const createNotes = async (req,res) =>{
    try{
 const{title,content} = req.body;
    const note = new Note({title,content,user:req.userId });
    const notes = await note.save();
    res.status(201).json({
        success:true,
        notes,
    });
    }catch(err){
    res.status(500).json({message:"Internal server error."});
   }
   
}

export const updateNotes = async (req,res) =>{
    try{
        const{title,content} = req.body;
       const note = await Note.findOne({
    _id: req.params.id,
    user: req.userId,
});
       
        if(!note){
            return res.status(404).json({msg:"Note not found"});
        }
        if(title){
            note.title = title;
        }
        if(content){
            note.content = content;
        }
        
        await note.save();
         res.status(200).json({
            success:true,
            note,
        });
    }catch(err){
    res.status(500).json({message:"Internal server error."});
   } 
}

export const deleteNotes =async (req,res) =>{
    try{
       const note = await Note.findOne({
    _id: req.params.id,
    user: req.userId,
});
        if(!note){
            return res.status(404).json({msg:"Note not found"});
        }

        await note.deleteOne();

         res.status(200).json({msg:"Notes deleted successfully"});
    }catch(err){
    res.status(500).json({message:"Internal server error."});
   }
   
}

// export const getSpecificNote = async (req,res) =>{
//     try{
//         const note = await Note.findById(req.params.id);
//         if(!note){
//             return res.status(404).json({msg:"Note not found"});
//         }
//         res.status(200).json(note);
//     }catch(err){
//          res.status(500).json({message:"Internal server error."});
//     }
// }