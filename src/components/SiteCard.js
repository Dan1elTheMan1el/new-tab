import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

const SiteCard = ({ site, colors }) => {
    const [favicon, setFavicon] = useState(null);
    
    // Get the domain from the URL to use with the favicon service
    const getFaviconUrl = (url) => {
        try {
            // Use Google's favicon service
            return `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
        } catch (error) {
            console.error('Error generating favicon URL:', error);
            return null;
        }
    };
    
    useEffect(() => {
        if (site.url) {
            setFavicon(getFaviconUrl(site.url));
        }
    }, [site.url]);

    return(
        <Card elevation={3} sx={{ maxWidth: 250, minWidth: 250, color: colors.textColor, backgroundColor:colors.secondaryColor }}>
            <CardActionArea href={site.url}>
                <CardContent sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px 8px' // Reduce padding on sides
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {favicon && (
                            <Box sx={{ mr: 1.5 }}>
                                <img 
                                    src={favicon} 
                                    alt={`${site.name} icon`} 
                                    style={{ 
                                        width: '28px', 
                                        height: '28px',
                                        objectFit: 'contain'
                                    }}
                                    onError={(e) => {
                                        console.error('Error loading favicon:', e);
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </Box>
                        )}
                        <h2 style={{ margin: 0 }}>{site.name}</h2>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SiteCard;