import { Typography } from '@mui/material';
import { NOT_FOUND } from '../constants/constants';

const NotFound = () => {
  return (
    <>
      <Typography variant="h4" component="h4">404</Typography>
      <Typography variant="p" component="p" sx={{ padding: '30px', fontSize: '18px' }}>{NOT_FOUND}</Typography>
    </>
  )
}

export default NotFound