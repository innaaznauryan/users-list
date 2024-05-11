import { useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { Button, Drawer, List, ListItem } from '@mui/material';
import { Menu } from '@mui/icons-material';
import AddOrEditForm from './AddOrEditForm';
import { HOME, USERS_LIST, CREATE_USER } from '../constants/constants';

const NavMenu = () => {
    const [openNav, setOpenNav] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const { isLoggedIn } = useSelector(({ login }) => login)

    const handleOpenDialog = () => {
        setOpenNav(false)
        setOpenDialog(true)
    }

    return (
        <>
            {isLoggedIn && <Button
                variant='contained'
                sx={{ margin: '20px' }}
                onClick={() => setOpenNav(true)}>
                <Menu />
            </Button>}

            <Suspense>
                <Outlet></Outlet>
            </Suspense>

            <Drawer open={openNav} onClose={() => setOpenNav(false)}>
                <List>
                    <ListItem>
                        <Button onClick={() => setOpenNav(false)}>
                            <NavLink to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                {HOME}
                            </NavLink>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => setOpenNav(false)}>
                            <NavLink to='/list' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                {USERS_LIST}
                            </NavLink>
                        </Button>
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