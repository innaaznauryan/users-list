import { setUsers, deleteUser, editUser, createUser } from './usersSlice';
import { getAllUsers, removeUser, updateUser, addUser } from '../db/indexedDB';

export const getUsersThunk = () => async (dispatch) => {
  try {
    const data = await getAllUsers()
    dispatch(setUsers(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeUserThunk = (id) => async (dispatch) => {
  try {
    await removeUser(id)
    dispatch(deleteUser(id))
  } catch (err) {
    console.error(err)
  }
}

export const createUserThunk = (user) => async (dispatch) => {
  try {
    await addUser(user)
    dispatch(createUser(user))
  } catch (err) {
    console.error(err)
  }
}

export const editUserThunk = (user) => async (dispatch) => {
  try {
    await updateUser(user)
    dispatch(editUser(user))
  } catch (err) {
    console.error(err)
  }
}