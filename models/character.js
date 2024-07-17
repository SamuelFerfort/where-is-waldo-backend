import mongoose from "mongoose";

const { Schema } = mongoose;

const CharacterSchema = new Schema({
  x: { type: Schema.Types.ObjectId, required: true },
  y: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Character", CharacterSchema);
