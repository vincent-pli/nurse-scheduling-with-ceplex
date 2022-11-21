import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
    'Emergency',
    'Consultation',
    'Cardiac Care',
    'Geriatrics',
];

const SimpleListMenu = ({options, selected}) => {
    console.log("-----")
    console.log(options)
    console.log(selected)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(selected);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event) => {
        console.log("handleClickListItem")
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        console.log("handleMenuItemClick")
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        console.log("handleClose")
        setAnchorEl(null);
    };

    return (
        <div>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
            >
                <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="department"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary={ options.filter((obj => obj.id == selectedIndex))[0].name}
                    />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        // disabled={index === 0}
                        selected={option.id === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, option.id)}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default SimpleListMenu;