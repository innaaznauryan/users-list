import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, TextField, Button, Alert, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { credentials } from '../constants/cred';
import { WRONG_CREDS, SIGN_IN } from '../constants/constants';
import { loginUser } from '../redux/logineSlice';
import "./login.css";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username === credentials.username && password === credentials.password) {
            dispatch(loginUser(true))
            localStorage.setItem("user", username)
        } else {
            setAlert(WRONG_CREDS)
            setTimeout(() => {
                setAlert("")
            }, 3000);
        }
        setUsername("")
        setPassword("")
    }

    return (
        <div className='loginLayout'>
            <Typography variant='h4' component='h4'>{SIGN_IN}</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ gap: '10px' }}>
                    <TextField
                        type='text'
                        required
                        onChange={e => setUsername(e.target.value)}
                        value={username.trim()}
                        autoComplete='username'
                        name='username'
                        label='Username'
                        variant="outlined" />
                    <TextField
                        type='password'
                        required
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        autoComplete='current-password'
                        name='password'
                        label='Password'
                        variant="outlined" />
                    <Button type='submit' variant="contained" sx={{ alignSelf: 'center' }}>Submit</Button>
                </FormControl>
            </form>
            <div className='alert'>{alert &&
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="error">
                    {alert}
                </Alert>}
            </div>
        </div>
    )
}

export default Login