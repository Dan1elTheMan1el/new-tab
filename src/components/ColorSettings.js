import MenuItem from '@mui/material/MenuItem';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

// Determine the text color based on the background color
const getContrastingTextColor = (bgColor) => {
const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
const r = parseInt(color.substring(0, 2), 16);
const g = parseInt(color.substring(2, 4), 16);
const b = parseInt(color.substring(4, 6), 16);
const brightness = (r * 299 + g * 587 + b * 114) / 1000;
return brightness > 125 ? 'black' : 'white';
};

// Lighten a color by a percentage
function lightenColor(color, percent) {
const hexColor = color.charAt(0) === '#' ? color.substring(1, 7) : color;
const num = parseInt(hexColor, 16),
        amt = Math.round(2.55 * percent * 100),
        R = (num >> 16) + amt,
        G = ((num >> 8) & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
return `#${(0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1)}`;
}

function ColorSettings({colors, setColors}) {
    const [currentColor, setCurrentColor] = useState(null);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const handleColorChange = (color, colorType) => {
        setColors(prevColors => ({
            ...prevColors,
            [colorType]: color.hex
        }));
    };

    const handleMenuItemClick = (colorType) => {
        setCurrentColor(colorType);
        setColorPickerVisible(true);
    };

    const colorNames = {
        textColor: 'Text Color',
        primaryColor: 'Primary Color',
        secondaryColor: 'Secondary Color'
    }

    return(
        <div>
            <h3 style={{margin:'4px',textAlign:'center',textDecoration:'underline'}}>Color Settings</h3>
            <MenuItem 
                onClick={() => handleMenuItemClick('textColor')}
                sx={{ 
                backgroundColor: colors.textColor, 
                color: getContrastingTextColor(colors.textColor),
                '&:hover': {
                    backgroundColor: lightenColor(colors.textColor, 0.2)
                }
                }}
            >
                Edit Text Color
            </MenuItem>
            <MenuItem 
                onClick={() => handleMenuItemClick('primaryColor')}
                sx={{ 
                backgroundColor: colors.primaryColor, 
                color: getContrastingTextColor(colors.primaryColor),
                '&:hover': {
                    backgroundColor: lightenColor(colors.primaryColor, 0.2)
                }
                }}
            >
                Edit Primary Color
            </MenuItem>
            <MenuItem 
                onClick={() => handleMenuItemClick('secondaryColor')}
                sx={{ 
                backgroundColor: colors.secondaryColor, 
                color: getContrastingTextColor(colors.secondaryColor),
                '&:hover': {
                    backgroundColor: lightenColor(colors.secondaryColor, 0.2)
                }
                }}
            >
                Edit Secondary Color
            </MenuItem>
            {colorPickerVisible && (
                <div>
                    <SketchPicker
                        color={colors[currentColor]}
                        onChangeComplete={(color) => handleColorChange(color, currentColor)}
                    />
                    <p style={{margin:'4px',textAlign:'center',fontWeight:'bold'}}>Editing: {colorNames[currentColor]}</p>
                </div>
            )}
            <MenuItem onClick={() => setColors({
                textColor: '#ffffff',
                primaryColor: '#282c34',
                secondaryColor: '#363e4d'
            })}>
                Reset to Defaults
            </MenuItem>
        </div>
    )
}

export default ColorSettings;

