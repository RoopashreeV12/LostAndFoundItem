import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
{
  type: {
    type: String,
    enum: ["lost", "found"],
    required: true
  },

  category: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String
  },

  contact: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  status: {
    type: String,
    enum: ["open", "resolved"],
    default: "open"
  }

},
{ timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;