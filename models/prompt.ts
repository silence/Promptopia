import { Schema, model, models, Document, Types } from "mongoose";

// Types
import { Model } from "mongoose";

interface PromptDocument extends Document<Types.ObjectId> {
  creator: string;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
});

const Prompt: Model<PromptDocument> =
  models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
