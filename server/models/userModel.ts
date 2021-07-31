import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name."],
        trim: true,
        minLength: [3, "Your name must be at least 3 characters long."],
        maxLength: [20, "Your name can be up to 20 characters long."]
    },
    account: {
        type: String,
        required: [true, "Please add your email address or phone number."],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please add your password."],
        trim: true,
        minLength: [6, "Your password must be at least 6 characters."]
    },
    avatar: {
        type: String,
        default: "https://i.ibb.co/N9Xp6YD/profile-default.png"
    },
    role: {
        type: String,
        default: 'user' // ADMIN
    },
    type: {
        type: String,
        default: 'normal' // FAST
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema);