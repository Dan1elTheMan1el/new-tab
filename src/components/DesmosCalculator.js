import React from 'react';
import { Paper } from '@mui/material';

function DesmosCalculator({ colors }) {

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
      <iframe
        src="https://www.desmos.com/scientific"
        title="Desmos Scientific Calculator"
        style={{
          width: '100%',
          height: '400px',
          border: `1px solid ${colors.primaryColor}`,
          borderRadius: '8px',
          backgroundColor: '#fff'
        }}
        frameBorder="0"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms"
        loading="lazy"
      />
    </Paper>
  );
}

export default DesmosCalculator;
