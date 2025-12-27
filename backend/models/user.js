
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
//user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    adharCardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "voter"],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }

})


userSchema.pre('save', async function (next) {
    const user = this;//for any this pre middle ware call
    //hash tha password only if it has been modified;
    if (!user.isModified('password')) return;
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        //hash password 
        const hashPassword = await bcrypt.hash(user.password, salt);
        // override the plain password with the hashed one
        user.password = hashPassword;
        // next();
    } catch (err) {
        // next(err);
        throw err;
    }
})

userSchema.methods.comparePassword = async function (userpassword) {
    try {
        // use bcrypt to compare the provided password with hashed password
        const isMatch = await bcrypt.compare(userpassword, this.password);
        return isMatch;
    } catch (err) {
        throw (err);
    }
};
const User = mongoose.model('User', userSchema);
export default User;