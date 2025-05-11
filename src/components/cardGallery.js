import React from 'react';
import { Grid2 } from '@mui/material';
import SiteCard from './SiteCard';
import AddSiteCard from './AddSiteCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function CardGallery({ sites, colors, onAddSite, editMode, onDeleteSite, onMoveSite }) {
    const moveCard = (dragIndex, hoverIndex) => {
        if (onMoveSite) {
            onMoveSite(dragIndex, hoverIndex);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Grid2 container spacing={2} justifyContent='center'>
                {sites.map((site, index) => (
                    <Grid2 item key={site.url + index}>
                        <SiteCard 
                            site={site} 
                            colors={colors}
                            editMode={editMode}
                            onDelete={() => onDeleteSite(index)}
                            index={index}
                            moveCard={moveCard}
                        />
                    </Grid2>
                ))}
                <Grid2 item>
                    <AddSiteCard colors={colors} onAddSite={onAddSite}/>
                </Grid2>
            </Grid2>
        </DndProvider>
    )
}

export default CardGallery;