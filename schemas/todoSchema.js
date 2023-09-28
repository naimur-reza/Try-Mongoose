const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance method
todoSchema.methods = {
  findByStatus: (status) => {
    return mongoose.model("Todo", todoSchema).find({ status });
  },
};

// static method
// we can not use => es6 method for the static method
todoSchema.statics = {
  findByTitle: function (title) {
    return this.find({ title: new RegExp(title, "i") });
  },
};

module.exports = mongoose.model("Todo", todoSchema);
