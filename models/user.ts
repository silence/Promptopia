import { Schema, model, models, Document, Types } from "mongoose";

// Types
import { Model } from "mongoose";

interface UserDocument extends Document<Types.ObjectId> {
  email: string;
  username: string;
  image?: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      // Attention: this regex is just a example. since it's the username of google. it's not a good idea to use this regex. sometimes we may not qualify the username of google.
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username is invalid, it should contain 8-20 characters, no _ or . at the beginning or end, no __ or _. or ._ or .. inside, allowed characters: a-zA-Z0-9._",
    ],
  },
  image: {
    type: String,
  },
});

// The "models" object is provided by the Mongoose library and stores all the registered models.
// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model.
// The newly created model is then assigned to the "User" variable.
const User: Model<UserDocument> = models?.User || model("User", UserSchema);

export default User;
