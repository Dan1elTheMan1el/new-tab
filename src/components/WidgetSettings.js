import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function WidgetSettings({ leetCodeUsername, setLeetCodeUsername }) {
    const [username, setUsername] = useState(leetCodeUsername);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSave = () => {
        setLeetCodeUsername(username);
    };

    return (
        <div>
            <h3 style={{margin:'4px',textAlign:'center',textDecoration:'underline'}}>Widget Settings</h3>
            <Box sx={{ padding: '8px 16px' }}>
                <TextField
                    label="LeetCode Username"
                    value={username}
                    onChange={handleUsernameChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                    helperText="Username for LeetCode daily challenge tracking"
                />
                <MenuItem 
                    onClick={handleSave}
                    sx={{ 
                        marginTop: '8px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    Save Settings
                </MenuItem>
            </Box>
        </div>
    );
}

export default WidgetSettings;
