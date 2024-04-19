import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogTitle, FormControl, TextField, Button } from '@mui/material';
import { CREATE_USER, EDIT_USER, NAME_ERROR, EMAIL_ERROR, PHONE_ERROR, AGE_ERROR } from '../constants/constants';
import { editUserThunk, createUserThunk } from '../redux/actions';

const AddOrEditForm = ({ open, onClose, user }) => {
    const dispatch = useDispatch()
    const [_user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        ...(user?.id && user)
    })

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false,
        age: false
    })

    const cleanup = () => {
        setUser({
            name: '',
            email: '',
            phone: '',
            age: ''
        })
        setErrors({
            name: false,
            email: false,
            phone: false,
            age: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(errors).some(Boolean)) {
            return
        }
        user?.id ? handleEditUser() : handleCreateUser()
        onClose()
    }

    const handleClose = () => {
        cleanup()
        onClose()
    }

    const handleBlur = (e) => {
        setErrors({
            ...errors,
            [e.target.name]: !e.target.value.trim()
        })
    }

    const handleChange = (e) => {
        setUser({
            ..._user,
            [e.target.name]: e.target.value
        })
    }

    const handleEditUser = () => {
        if (!user.id) {
            return
        }

        dispatch(editUserThunk({
            ..._user,
            name: _user.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
            age: +_user.age
        }))
    }

    const handleCreateUser = () => {
        dispatch(createUserThunk({
            id: uuidv4(),
            ..._user,
            name: _user.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
            age: +_user.age
        }))
    }


    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle>{user?.id ? EDIT_USER : CREATE_USER}</DialogTitle>
            <form onSubmit={handleSubmit} >
                <FormControl sx={{ gap: '20px', padding: '20px', width: '100%' }}>
                    <TextField
                        type='text'
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={_user.name}
                        name='name'
                        label='Name'
                        variant='outlined'
                        error={errors.name}
                        helperText={errors.name ? NAME_ERROR : ''} />
                    <TextField
                        type='email'
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={_user.email}
                        name='email'
                        label='Email'
                        variant='outlined'
                        error={errors.email}
                        helperText={errors.email ? EMAIL_ERROR : ''} />
                    <TextField
                        type='tel'
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={_user.phone}
                        name='phone'
                        label='Phone'
                        variant='outlined'
                        error={errors.phone}
                        helperText={errors.phone ? PHONE_ERROR : ''} />
                    <TextField
                        type='number'
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={_user.age}
                        name='age'
                        label='Age'
                        variant='outlined'
                        error={errors.age}
                        helperText={errors.age ? AGE_ERROR : ''} />
                    <div>
                        <Button
                            onClick={handleClose}
                            variant='contained'
                            sx={{ margin: '20px 5px' }}>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            color='success'
                            sx={{ margin: '20px 5px' }}>
                            Save
                        </Button>
                    </div>
                </FormControl>
            </form>
        </Dialog>

    )
}

export default AddOrEditForm