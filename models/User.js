import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id : {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: {type: String, required: false  },
    cartItems: { type: Object, default: {}}
}, {minimize: false});

const User = mongoose.models.user || mongoose.model('User', userSchema);

export default User; 