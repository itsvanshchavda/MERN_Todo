import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    await Task.create({ title, description, user: req.user });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res) => {
  const userID = req.user._id;

  try {
    const tasks = await Task.find({ user: userID });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler());
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted!!",
    });
  } catch (error) {
    next(error);
  }
};
