import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = {
  entities: [],
  isLoading: true
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload.sort((a, b) => {
        if (a.id < b.id) return 1
        if (a.id > b.id) return -1
        return 0
      });
      state.isLoading = false
    },
    update(state, action) {
      const elIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[elIndex] = { ...state.entities[elIndex], ...action.payload };
    },
    remove(state, action) {
      const elIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities.splice(elIndex, 1)
    },
    create(state, action) {
      state.entities.unshift(action.payload)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFaild(state) {
      state.isLoading = false
    }
  }
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, recived, create, taskRequested, taskRequestFaild } = actions

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFaild())
    dispatch(setError(error.message))
  }
}

export const createTask = (taskData) => async (dispatch) => {
  try {
    const data = await todosService.createTask(taskData)
    dispatch(create(data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }))
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskRemoved(id) {
  return remove({id})
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
