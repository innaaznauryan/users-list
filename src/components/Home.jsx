import { Typography } from '@mui/material';
import { WELCOME } from '../constants/constants';

const Home = () => {
    return (
        <>
            <Typography variant="h4" component="h4">{WELCOME}</Typography>
            <Typography variant="p" component="p" sx={{padding: '30px', fontSize: '18px'}}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae maiores reprehenderit deleniti suscipit cupiditate repellat officia, at esse quisquam. Illum molestias aspernatur enim quo maxime adipisci ut beatae eligendi necessitatibus incidunt repudiandae totam porro dolore saepe nostrum id, eum est, optio esse. Hic quis nostrum doloremque! Ex pariatur quam corporis.
            </Typography>

        </>
    )
}

export default Home