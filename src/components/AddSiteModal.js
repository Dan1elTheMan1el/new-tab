import { useState } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button 
} from '@mui/material';

const AddSiteModal = ({ open, onClose, onAddSite }) => {
    const [siteName, setSiteName] = useState('');
    const [siteUrl, setSiteUrl] = useState('');
    const [nameError, setNameError] = useState(false);
    const [urlError, setUrlError] = useState(false);

    const handleSubmit = () => {
        // Basic validation
        let isValid = true;
        
        if (!siteName.trim()) {
            setNameError(true);
            isValid = false;
        } else {
            setNameError(false);
        }

        if (!siteUrl.trim()) {
            setUrlError(true);
            isValid = false;
        } else {
            // Add http:// if protocol is missing
            let formattedUrl = siteUrl;
            if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
                formattedUrl = 'https://' + formattedUrl;
            }
            setSiteUrl(formattedUrl);
            setUrlError(false);
        }

        if (isValid) {
            // Ensure URL has a protocol
            let formattedUrl = siteUrl;
            if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
                formattedUrl = 'https://' + formattedUrl;
            }
            
            onAddSite({ name: siteName, url: formattedUrl });
            handleClose();
        }
    };

    const handleClose = () => {
        setSiteName('');
        setSiteUrl('');
        setNameError(false);
        setUrlError(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Site</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Site Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    error={nameError}
                    helperText={nameError ? "Name is required" : ""}
                />
                <TextField
                    margin="dense"
                    id="url"
                    label="URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    error={urlError}
                    helperText={urlError ? "URL is required" : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSiteModal;
