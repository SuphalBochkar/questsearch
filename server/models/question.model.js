const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["ANAGRAM", "MCQ", "READ_ALONG", "CONTENT_ONLY"],
    },
    title: { type: String },
    anagramType: {
      type: String,
      enum: ["SENTENCE", "WORD", "ANAGRAM"],
    },
    blocks: [
      {
        text: { type: String, required: true },
        showInOption: { type: Boolean, default: true },
        isAnswer: { type: Boolean, default: false },
      },
    ],
    options: [
      {
        text: { type: String, required: true },
        isCorrectAnswer: { type: Boolean, required: true },
      },
    ],
    siblingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    solution: { type: String, required: false },
  },
  { timestamps: true }
);

questionSchema.index({ title: "text" });
questionSchema.index({ type: 1 });

const Questions = mongoose.model("questions", questionSchema);

module.exports = { Questions };
