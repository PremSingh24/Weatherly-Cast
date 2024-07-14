import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name Cannot be Empty"],
  },
  password: {
    type: String,
    required: [true, "Name Cannot be Empty"],
  },
  favCity: [],
});

export const Users = mongoose.model("Users", UserSchema);
