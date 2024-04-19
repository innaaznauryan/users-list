import { deleteUser, editUser, createUser } from './usersSlice'
import { removeUser, updateUser, addUser } from '../db/indexedDB'

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