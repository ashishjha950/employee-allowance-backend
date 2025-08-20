import mongoose from "mongoose";

const allowanceSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Approved", "Rejected"], 
        default: "Pending" 
    }
});

const allowanceModel = mongoose.model("Allowance", allowanceSchema);
export default allowanceModel;
