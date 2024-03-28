const express = require('express');

const ctrl = require('../../controllers/tasks');
const { validateBody, validateQuery } = require('../../decorators');
const { isValidId } = require('../../middlewares');
const schemas = require('../../schemas/tasks');

const addTaskValidate = validateBody(schemas.taskAddSchema);
const queryParamValidate = validateQuery(schemas.queryParamSchema);
const updateTaskCompletedValidate = validateBody(
  schemas.taskUpdateCompletedSchema
);

const router = express.Router();

router.get('/', queryParamValidate, ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', addTaskValidate, ctrl.add);

router.put('/:id', isValidId, addTaskValidate, ctrl.updateById);
router.patch(
  '/:id/completed',
  isValidId,
  updateTaskCompletedValidate,
  ctrl.updateCompleted
);

router.delete('/:id', ctrl.deleteById);

router.get('/up/ping', ctrl.getPing);

module.exports = router;
