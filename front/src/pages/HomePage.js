import './homepage.css'
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';

const HomePage = () => {
    return (
        <Grid style={{margin: '0 auto', backgroundColor: 'pink', maxWidth: '800px'}} container spacing={1}>
            <Grid item xs={3}>
                <Link to="people" className="item">people</Link>
            </Grid>

            <Grid item xs={3}>
                <Link to="planets" className="item">planets</Link>
            </Grid>

            <Grid item xs={3}>
                <Link to="starships" className="item">starships</Link>
            </Grid>
        </Grid>
    )
}

export default HomePage