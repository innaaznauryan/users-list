import { setUsers, createUser, editUser, deleteUser } from './usersSlice';
import { getAllUsers, addUser, updateUser, removeUser } from '../db/indexedDB';

export const getUsersThunk = () => async (dispatch) => {
  try {
    const data = await getAllUsers()
    dispatch(setUsers(data))
  } catch (err) {
    console.log(err)
  }
}

export const createUserThunk = (user) => async (dispatch) => {
  addUser(user)
  dispatch(createUser(user))
}

export const editUserThunk = (user) => async (dispatch) => {
  updateUser(user)
  dispatch(editUser(user))
}

export const removeUserThunk = (id) => async (dispatch) => {
  removeUser(id)
  dispatch(deleteUser(id))
}