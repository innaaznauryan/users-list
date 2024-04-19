import { useState } from 'react';
import { useSelector } from 'react-redux';
import { USERS_LIST, NO_USERS } from '../constants/constants';
import { Edit, Delete } from '@mui/icons-material';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
import AddOrEditForm from './AddOrEditForm';
import Confirm from './Confirm';

const UserList = () => {

  const { data } = useSelector(({ users }) => users)

  const [openDialog, setOpenDialog] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)

  const handleOpenDialog = (user) => {
    setUserToEdit(user)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setUserToEdit(null)
  }

  const handleOpenConfirm = (user) => {
    setUserToDelete(user)
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
    setUserToDelete(null)
  }

  return (
    <>
      <Typography variant='h4' component='h1'>{USERS_LIST}</Typography>
      {data.length ? <TableContainer sx={{ padding: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(user => (
              <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(user)} sx={{ padding: { xs: '2px', sm: '8px' } }}>
                    <Edit color='primary' sx={{ fontSize: { xs: '16px', sm: '20px' } }} />
                  </IconButton>
                  <IconButton onClick={() => handleOpenConfirm(user)} sx={{ padding: { xs: '2px', sm: '8px' } }}>
                    <Delete color='primary' sx={{ fontSize: { xs: '16px', sm: '20px' } }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
      : <Typography sx={{ padding: '20px' }}>{NO_USERS}</Typography>}

      {userToEdit && <AddOrEditForm
        open={openDialog}
        onClose={handleCloseDialog}
        user={userToEdit}
      />}

      {userToDelete && <Confirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        user={userToDelete}
      />}
    </>
  )
}

export default UserList