const Task = require('../models/Task');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const getAll = async (req, res) => {
  const { filterQuery, day, month, year } = req.query;

  const filter = {};
  if (filterQuery) {
    filter.$or = [
      { name: { $regex: filterQuery, $options: 'i' } },
      { description: { $regex: filterQuery, $options: 'i' } },
    ];
  }

  if (day && month && year) {
    const startDate = new Date(Date.UTC(year, month - 1, day));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

    filter.date = {
      $gte: startDate,
      $lte: endDate,
    };
  } else if (month && year) {
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));

    filter.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const result = await Task.find(filter).sort({ createdAt: -1 });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findById(id);
  if (!result) {
    throw HttpError(404, `Task with this id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Task.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Task with this id=${id} not found`);
  }
  res.json(result);
};

const updateCompleted = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Task with this id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Task with this id=${id} not found`);
  }
  res.json({ message: 'Delete success' });
};

const getPing = async (_, res) => {
  res.status(200).json({ message: 'Server is alive' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateCompleted: ctrlWrapper(updateCompleted),
  deleteById: ctrlWrapper(deleteById),
  getPing: ctrlWrapper(getPing),
};
