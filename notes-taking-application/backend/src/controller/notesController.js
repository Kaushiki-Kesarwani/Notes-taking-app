export const getNotes = (req,res) =>{
    res.status(200).send("fetched notes");
}

export const postNotes = (req,res) =>{
    res.status(201).json({msg:"Notes created successfully"});
}

export const putNotes = (req,res) =>{
    res.status(200).json({msg:"Notes updated successfully"});
}

export const deleteNotes = (req,res) =>{
    res.status(200).json({msg:"Notes deleted successfully"});
}