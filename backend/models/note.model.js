import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
    title: {type: String, required:true},
    content: {type: String, required:true},
    tags: {type: [String], default:[]},
    isPinned: {type: Boolean, default:false},
    userId: {type: String, required:true},
    createdOn: {type: Date, default: new Date().getTime() },
});

const Note =  mongoose.model("Note", nodeSchema);

export default Note;