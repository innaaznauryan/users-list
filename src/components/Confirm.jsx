import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { DELETE_USER, ARE_YOU_SURE } from '../constants/constants';
import { removeUserThunk } from '../redux/usersThunk';

const Confirm = ({ open, onClose, user }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(removeUserThunk(user.id))
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle>{DELETE_USER}</DialogTitle>
            <DialogContent >{ARE_YOU_SURE}</DialogContent>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{user.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{user.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Phone</TableCell>
                        <TableCell>{user.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Age</TableCell>
                        <TableCell>{user.age}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div>
                <Button
                    sx={{ margin: '20px 5px' }}
                    onClick={onClose}
                    variant='contained'>
                    Cancel
                </Button>
                <Button
                    sx={{ margin: '20px 5px' }}
                    onClick={handleDelete}
                    variant='contained'
                    color='error'>
                    Delete
                </Button>
            </div>
        </Dialog>
    )
}

export default Confirm