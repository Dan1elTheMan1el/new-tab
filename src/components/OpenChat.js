import { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, Paper, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function OpenChat({ colors }) {
    const [prompt, setPrompt] = useState('');
    const [chatUrl, setChatUrl] = useState(null);
    const linkRef = useRef(null);

    const handleSend = () => {
        if (prompt.trim() === '') return;
        
        // Encode the prompt for URL
        const encodedPrompt = encodeURIComponent(prompt);
        // Set the ChatGPT URL with the prompt as a query parameter
        setChatUrl(`https://chat.openai.com/?q=${encodedPrompt}`);
        
        // Clear the input field after sending
        setPrompt('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    // Use effect to click the link when chatUrl changes
    useEffect(() => {
        if (chatUrl && linkRef.current) {
            linkRef.current.click();
            setChatUrl(null); // Reset after clicking
        }
    }, [chatUrl]);

    return (
        <Paper 
            elevation={3}
            sx={{ 
                p: 2,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--secondary-color)',
                maxWidth: '500px',
                width: '100%',
                marginTop: '20px'
            }}
        >
            {chatUrl && (
                <Link 
                    ref={linkRef}
                    href={chatUrl} 
                    rel="noopener" 
                    style={{ display: 'none' }} 
                />
            )}
            <TextField
                fullWidth
                placeholder="Ask ChatGPT..."
                variant="standard"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                    input: { 
                        color: 'var(--text-color)',
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: 'var(--primary-color)',
                        opacity: 0.5,
                    },
                    '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'var(--primary-color)',
                        opacity: 0.7,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'var(--primary-color)',
                    },
                }}
            />
            <IconButton 
                onClick={handleSend}
                sx={{
                    color: 'var(--text-color)',
                    ml: 1,
                }}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    );
}

export default OpenChat;