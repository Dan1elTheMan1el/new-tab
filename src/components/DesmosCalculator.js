import React, { useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';

function DesmosCalculator({ colors }) {
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
    setIsActivated(true);
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        margin: '20px auto',
        maxWidth: '600px', 
        width: '100%',
        padding: '15px',
        backgroundColor: colors.secondaryColor,
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        {!isActivated ? (
          <Box
            onClick={handleActivate}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 10,
              borderRadius: '8px',
              border: `1px solid ${colors.primaryColor}`,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ color: '#333', textAlign: 'center', px: 2 }}
            >
              Click to Activate Calculator
            </Typography>
          </Box>
        ) : null}

        {/* Only render the iframe when activated or render it hidden initially */}
        <iframe
          src="https://www.desmos.com/scientific"
          title="Desmos Scientific Calculator"
          style={{
            width: '100%',
            height: '400px',
            border: `1px solid ${colors.primaryColor}`,
            borderRadius: '8px',
            backgroundColor: '#fff',
            visibility: isActivated ? 'visible' : 'hidden'
          }}
          frameBorder="0"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-forms"
          loading="lazy"
        />
      </div>
    </Paper>
  );
}

export default DesmosCalculator;
