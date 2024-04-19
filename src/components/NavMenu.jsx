import { useState, startTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Drawer, List, ListItem } from '@mui/material';
import { Menu } from '@mui/icons-material';
import AddOrEditForm from './AddOrEditForm';
import { HOME, USERS_LIST, CREATE_USER } from '../constants/constants';

const NavMenu = () => {
    const [openNav, setOpenNav] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    
    const location = useLocation()
    const navigate = useNavigate()

    // if (localStorage.user) {
    //     return null
    // }

    const navigateHome = () => {
        setOpenNav(false)
        startTransition(() => navigate('/'))
    }

    const navigateList = () => {
        setOpenNav(false)
        startTransition(() => navigate('/list'))
    }

    const handleOpenDialog = () => {
        setOpenNav(false)
        setOpenDialog(true)
    }

    return (
        <>
            <Button
                variant='contained'
                sx={{ margin: '20px' }}
                onClick={() => setOpenNav(true)}>
                <Menu />
            </Button>

            <Drawer open={openNav} onClose={() => setOpenNav(false)}>
                <List>
                    <ListItem>
                        <Button onClick={navigateHome}>{HOME}</Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={navigateList}>{USERS_LIST}</Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={handleOpenDialog}>{CREATE_USER}</Button>
                    </ListItem>
                </List>
            </Drawer>

            <AddOrEditForm
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </>
    )
}

export default NavMenu