const { Schema, model } = require('mongoose');

const { handleValidateError, runUpdateValidators } = require('./hooks');

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for task'],
    },
    description: {
      type: String,
      required: [true, 'Set address for task'],
    },

    date: {
      type: Date,
      required: [true, 'Set date for task'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
taskSchema.post('save', handleValidateError);
taskSchema.pre('findOneAndUpdate', runUpdateValidators);
taskSchema.post('findOneAndUpdate', handleValidateError);

const Task = model('task', taskSchema);

module.exports = Task;
