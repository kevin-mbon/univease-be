import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    personalInformation: {
        firstName: { type: String, required: true },
        secondName: { type: String, required: true },
        dateOfBirth: { type: Date},
        gender: { type: String,
            enum: ['female','male','other']
        },
        role: {
            type: String,
            enum: ['admin', 'applicant', 'university'],
            required: true,
          },
        email: {type: String, required: true},
        password: { type:String, required: true},
        confirmPassword: { type:String, required: true} 
      }

    });

const Applicant = mongoose.model('Admin', adminSchema);
export default Applicant;