const { Schema, model, Types } = require('mongoose');


const  UserSchema = new Schema(
    {
     userId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
     },
     username: {
        type: String,
        required: true,
        trim: true,
     },
     email: {
        type: String,
        required: true,
        trim: true,
     }

    },
{
    toJSON: {
        getters: true
    }
}     
);
const User = model('User', UserSchema);
module.exports =  User;