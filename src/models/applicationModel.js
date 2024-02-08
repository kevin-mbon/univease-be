import mongoose from 'mongoose';
 const applicationSchema = new mongoose.Schema({
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required: true,
      },
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber:{
        type: Number,
    },
    time:{
       type: Date,
    },
    coverLetter:{
        type: String,
    },
    attachement:{   
        type: String,
    },
 },
 { timestamps: true }
 );

const Application = mongoose.model('Application', applicationSchema);
export default Application;