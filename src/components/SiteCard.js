import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const SiteCard = ({ site, colors, editMode, onDelete, index, moveCard }) => {
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
    
    const handleDeleteClick = (e) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Prevent event bubbling
        onDelete();
    };
    
    // Drag and drop implementation
    const ref = React.useRef(null);
    
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            
            // Get horizontal middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            
            // Get pixels to the left
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;
            
            // Only perform the move when the mouse has crossed half of the items width
            // When dragging right, only move when the cursor is after 50%
            // When dragging left, only move when the cursor is before 50%
            
            // Dragging right
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }
            
            // Dragging left
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }
            
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id: site.url, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => editMode,
    });
    
    const opacity = isDragging ? 0.4 : 1;
    
    drag(drop(ref));

    return(
        <Card 
            ref={ref}
            elevation={3} 
            sx={{ 
                maxWidth: 250, 
                minWidth: 250, 
                color: colors.textColor, 
                backgroundColor: colors.secondaryColor,
                position: 'relative', // For absolute positioning of delete button
                overflow: 'visible', // Allow content to overflow the card boundaries
                opacity: opacity,
                cursor: editMode ? 'move' : 'pointer',
                border: editMode ? '2px dashed var(--text-color)' : 'none',
                transition: 'all 0.2s ease'
            }}
            data-handler-id={handlerId}
        >
            {editMode && (
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={handleDeleteClick}
                    sx={{
                        position: 'absolute',
                        right: -8,
                        top: -8,
                        color: 'white',
                        background: 'rgba(255, 0, 0, 0.7)',
                        width: '24px',
                        height: '24px',
                        '&:hover': {
                            background: 'rgba(255, 0, 0, 0.9)',
                        },
                        zIndex: 2,
                        padding: 0,
                        minWidth: 0
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
            <CardActionArea 
                href={editMode ? undefined : site.url}
                disabled={editMode}
                sx={{
                    pointerEvents: editMode ? 'none' : 'auto',
                    cursor: editMode ? 'default' : 'pointer',
                }}
            >
                <CardContent sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px 8px', // Reduce padding on sides
                    overflow: 'hidden' // Prevent text from overflowing
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden', // Keep text contained
                        textOverflow: 'ellipsis' // Show ellipsis for overflow text
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