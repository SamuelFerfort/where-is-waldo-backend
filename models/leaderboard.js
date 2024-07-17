import mongoose from "mongoose";

const { Schema } = mongoose;

const LeaderboardSchema = new Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  image: { type: String, required: true },
  date: {type: Date, default: Date.now}
});

CommentSchema.pre("save", function (next) {
  // TODO: format date
  next();
});

export default mongoose.model("Leaderboard", LeaderboardSchema);
