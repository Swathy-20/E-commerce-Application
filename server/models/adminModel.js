import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 30,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        mobile: {
            type: String,
            required: true,
        },
        // role:{
        //     type: String,
        //     enum:["admin","seller"],
        //     required :true

        // },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Admin = mongoose.model("Admin", adminSchema);