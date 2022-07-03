const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const  UserSchema = new Schema(
    {
     userId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
     },
     UserName: {
        type: String,
        required: true,
        trim: true,
     },
     UserEmail: {
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
