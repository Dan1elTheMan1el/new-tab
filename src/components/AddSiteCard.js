import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import AddIcon from '@mui/icons-material/Add';

const AddSiteCard = ({ colors, onAddSite }) => {
    return(
        <Card 
            elevation={3} 
            sx={{ 
                maxWidth: 250, 
                minWidth: 250, 
                color: colors.textColor, 
                backgroundColor: colors.secondaryColor,
                opacity: 0.4
            }}
        >
            <CardActionArea onClick={onAddSite}>
                <CardContent sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px 8px' // Match SiteCard padding
                }}>
                    <AddIcon sx={{ fontSize: 32 }} /> 
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AddSiteCard;
