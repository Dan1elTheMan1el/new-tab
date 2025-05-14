import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function WidgetSettings({ 
    leetCodeUsername, 
    setLeetCodeUsername, 
    showCalculator, 
    setShowCalculator,
    showLeetCode,
    setShowLeetCode,
    showChat,
    setShowChat
}) {
    const [username, setUsername] = useState(leetCodeUsername);

    // Update the username in parent component when it changes locally
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (username !== leetCodeUsername) {
                setLeetCodeUsername(username);
            }
        }, 500); // Debounce the input to avoid too many updates
        
        return () => clearTimeout(timeoutId);
    }, [username, leetCodeUsername, setLeetCodeUsername]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div>
            <Typography variant="subtitle1" sx={{margin:'4px',textAlign:'center',fontWeight:'bold'}}>
                Widget Settings
            </Typography>
            <Divider sx={{ my: 0.5 }} />
            <Box sx={{ padding: '6px 12px' }}>
                <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 'bold', display: 'block' }}>
                    Widget Visibility
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={showLeetCode}
                            onChange={(e) => setShowLeetCode(e.target.checked)}
                            name="leetCodeToggle"
                            color="primary"
                            size="small"
                        />
                    }
                    label={<Typography variant="body2">Daily LeetCode</Typography>}
                    sx={{ width: '100%', mb: 0.5 }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={showChat}
                            onChange={(e) => setShowChat(e.target.checked)}
                            name="chatToggle"
                            color="primary"
                            size="small"
                        />
                    }
                    label={<Typography variant="body2">ChatGPT Prompt</Typography>}
                    sx={{ width: '100%', mb: 1 }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={showCalculator}
                            onChange={(e) => setShowCalculator(e.target.checked)}
                            name="calculatorToggle"
                            color="primary"
                            size="small"
                        />
                    }
                    label={<Typography variant="body2">Scientific Calculator</Typography>}
                    sx={{ width: '100%', mb: 0.5 }}
                />
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="caption" sx={{ mb: 0.5, mt: 1, fontWeight: 'bold', display: 'block' }}>
                    LeetCode Settings
                </Typography>
                <TextField
                    label="LeetCode Username"
                    value={username}
                    onChange={handleUsernameChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                    helperText="Username for LeetCode challenge"
                    InputProps={{ style: { fontSize: '0.9rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.9rem' } }}
                    FormHelperTextProps={{ style: { fontSize: '0.75rem' } }}
                />
            </Box>
        </div>
    );
}

export default WidgetSettings;
