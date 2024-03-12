import mongoose from "mongoose";

const { Schema } = mongoose;

const adsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
});

export default mongoose.model("ads", adsSchema);
