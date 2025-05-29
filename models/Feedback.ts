import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    name: String,
    feedback: String,
    email: String,
    createdAt: Date,

})

export default mongoose.models.Feedback || 
mongoose.model("Feedback", FeedbackSchema)