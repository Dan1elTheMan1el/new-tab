import { Grid2 } from '@mui/material';
import SiteCard from './SiteCard';
import AddSiteCard from './AddSiteCard';

function CardGallery({ sites, colors, onAddSite }) {
    return (
        <Grid2 container spacing={2} justifyContent='center'>
            {sites.map((site, index) => (
                <SiteCard key={index} site={site} colors={colors}/>
            ))}
            <Grid2 item>
                <AddSiteCard colors={colors} onAddSite={onAddSite}/>
            </Grid2>
        </Grid2>
    )
}

export default CardGallery;