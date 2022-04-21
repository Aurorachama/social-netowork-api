const date = require('date-and-time');
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minletngth: 1,
      maxlength : 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: date,
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // id: false,
  }
);

thoughtSchema.virtual("reactionCount")
    .get(function () {
        return (this.reactions.length) ? (this.reactions.length) : (0);
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;