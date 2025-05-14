import './App.css';
import { useState, useEffect } from 'react';
import CardGallery from './components/cardGallery';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import ColorSettings from './components/ColorSettings';
import WidgetSettings from './components/WidgetSettings';
import OpenChat from './components/OpenChat';
import DailyLeetCode from './components/DailyLeetCode';
import DesmosCalculator from './components/DesmosCalculator';
import AddSiteModal from './components/AddSiteModal';

function App() {
  // Setting name
  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem('name');
    return savedName ? savedName : '(Your name)';
  });
  
  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  // Updating name in local storage
  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);
  // Function to resize input field based on content
  const resizeNameInput = () => {
    const input = document.querySelector('.name-input');
    if (!input) return;

    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'pre';
    span.style.font = window.getComputedStyle(input).font;

    span.textContent = input.value;
    document.body.appendChild(span);
    input.style.width = span.offsetWidth + 'px';
    document.body.removeChild(span);
  };

  // Resize input field when name changes
  useEffect(() => {
    resizeNameInput();
  }, [name]);

  // Resize input field when window size changes
  useEffect(() => {
    window.addEventListener('resize', resizeNameInput);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', resizeNameInput);
    };
  }, []);

  // Sites state with localStorage persistence
  const [sites, setSites] = useState(() => {
    const savedSites = localStorage.getItem('sites');
    return savedSites ? JSON.parse(savedSites) : [
      { name: 'YouTube', url: 'https://www.youtube.com/' },
      { name: 'GitHub', url: 'https://www.github.com' },
      { name: 'Google', url: 'https://www.google.com' },
    ];
  });

  // Save sites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('sites', JSON.stringify(sites));
  }, [sites]);

  const [addSiteModalOpen, setAddSiteModalOpen] = useState(false);

  const handleAddSite = (newSite) => {
    setSites([...sites, newSite]);
  };
  
  const handleDeleteSite = (index) => {
    const newSites = [...sites];
    newSites.splice(index, 1);
    setSites(newSites);
  };
  
  const handleMoveSite = (dragIndex, hoverIndex) => {
    const dragSite = sites[dragIndex];
    const newSites = [...sites];
    newSites.splice(dragIndex, 1); // Remove dragged item
    newSites.splice(hoverIndex, 0, dragSite); // Insert it at the new position
    setSites(newSites);
  };

  const [colors, setColors] = useState(() =>{
    const savedColors = localStorage.getItem('colors');
    return savedColors ? JSON.parse(savedColors) : {
      textColor: '#ffffff',
      primaryColor: '#282c34',
      secondaryColor: '#363e4d'
    }
  });
  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', colors.textColor);
    document.documentElement.style.setProperty('--primary-color', colors.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', colors.secondaryColor);
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);
  
  // LeetCode username state with localStorage persistence
  const [leetCodeUsername, setLeetCodeUsername] = useState(() => {
    const savedUsername = localStorage.getItem('leetCodeUsername');
    return savedUsername || 'DefaultUsername';
  });
  
  // Save LeetCode username to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('leetCodeUsername', leetCodeUsername);
  }, [leetCodeUsername]);

  // Calculator visibility state with localStorage persistence
  const [showCalculator, setShowCalculator] = useState(() => {
    const savedShowCalculator = localStorage.getItem('showCalculator');
    return savedShowCalculator ? JSON.parse(savedShowCalculator) : true;
  });

  // Save calculator visibility to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('showCalculator', JSON.stringify(showCalculator));
  }, [showCalculator]);

  // LeetCode visibility state with localStorage persistence
  const [showLeetCode, setShowLeetCode] = useState(() => {
    const savedShowLeetCode = localStorage.getItem('showLeetCode');
    return savedShowLeetCode ? JSON.parse(savedShowLeetCode) : true;
  });

  // Save LeetCode visibility to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('showLeetCode', JSON.stringify(showLeetCode));
  }, [showLeetCode]);

  // Chat visibility state with localStorage persistence
  const [showChat, setShowChat] = useState(() => {
    const savedShowChat = localStorage.getItem('showChat');
    return savedShowChat ? JSON.parse(savedShowChat) : true;
  });

  // Save Chat visibility to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('showChat', JSON.stringify(showChat));
  }, [showChat]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className="App">
      <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton //Settings button
          id='settings-button'
          aria-controls={open ? 'settings-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <SettingsIcon sx={{color:'var(--text-color)', fontSize:35}} />
        </IconButton>
        
        <IconButton //Edit mode toggle
          onClick={() => setEditMode(!editMode)}
          sx={{ 
            marginTop: '8px',
            backgroundColor: editMode ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            '&:hover': {
              backgroundColor: editMode ? 'var(--secondary-color)' : 'rgb(0,0,0,0,2)',
            },
          }}
        >
          <EditIcon sx={{color:'var(--text-color)', fontSize:28}} />
        </IconButton>
      </div>
      <Menu //Settings menu
        id='settings-menu'
        MenuListProps={{
          'aria-labelledby': 'settings-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: '300px', 
            width: '100%'
          }
        }}
      >
        <ColorSettings colors={colors} setColors={setColors} />
        <WidgetSettings 
          leetCodeUsername={leetCodeUsername} 
          setLeetCodeUsername={setLeetCodeUsername}
          showCalculator={showCalculator}
          setShowCalculator={setShowCalculator}
          showLeetCode={showLeetCode}
          setShowLeetCode={setShowLeetCode}
          showChat={showChat}
          setShowChat={setShowChat}
        />
      </Menu>

      <header className="App-header">
        <p>Welcome, <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="name-input">
        </input>!</p>
      </header>

      
      <CardGallery 
    sites={sites}
    colors={colors}
    onAddSite={() => setAddSiteModalOpen(true)}
    editMode={editMode}
    onDeleteSite={handleDeleteSite}
    onMoveSite={handleMoveSite}
  />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap'
      }}>
        {/* Left Column: LeetCode and OpenChat */}
        <div style={{ 
          flex: '1', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '600px',
          padding: '0 10px'
        }}>
          {showLeetCode && <DailyLeetCode colors={colors} username={leetCodeUsername}/>}
          {showChat && <OpenChat colors={colors} />}
        </div>
        
        {/* Right Column: Calculator */}
        <div style={{ 
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '600px',
          padding: '0 10px'
        }}>
          {showCalculator && <DesmosCalculator colors={colors} />}
        </div>
      </div>
      
      <AddSiteModal
        open={addSiteModalOpen}
        onClose={() => setAddSiteModalOpen(false)}
        onAddSite={handleAddSite}
      />
    </div>
  );
}

export default App;