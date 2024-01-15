import mongoose from('mongoose');

const universitySchema = new mongoose.Schema({
    universityName: {
        type: String,
        required: true
    },
    universityLogo: {
        type: String
    },
    contactInformation: {
        address: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        emailAddress: {
            type: String
        }
    },
    websiteURL: {
        type: String
    },
    typeOfInstitution: {
        type: String,
        required: true
    },
    accreditation: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    programsOffered: {
        type: [String]
    },
    applicationRequirements: {
        type: String
    },
    applicationDeadline: {
        type: Date
    },
    tuitionAndFees: {
        type: String
    },
    admissionsContact: {
        name: {
            type: String
        },
        contactDetails: {
            type: String
        }
    },
    socialMediaLinks: {
        type: [String]
    },
    termsAndConditions: {
        type: Boolean
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    securityMeasures: {
        twoFactorAuthentication: {
            type: Boolean
        }
    },
    verificationProcess: {
        type: String
    }
});

const University = mongoose.model('University', universitySchema);

module.exports = University;
