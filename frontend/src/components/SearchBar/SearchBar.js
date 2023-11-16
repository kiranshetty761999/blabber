import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import classes from './SearchBar.module.css';
import InputLabel from '@mui/material/InputLabel';
import { getBlabberUsers } from '../../services/blabberApiHandler';
import ProfilePic from '../ProfilePic/ProfilePic';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from '../../store/SnackBarSlice';

// Custom debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const SearchBar = (props) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const dispatch = useDispatch();

    // Create a debounced version of getMenuItems
    const debouncedGetMenuItems = debounce(async (value) => {
        try {
            const response = await getBlabberUsers(value);
            if (response.data.success) {
                setDisplayMenu(true);
                setMenuItems(response?.data?.data);
            } else {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'error',
                        message: 'Failed to fetch blabber users',
                    })
                );
            }
        } catch (error) {
            dispatch(
                updateSnackBar({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong',
                })
            );
        }
    }, 300); // Adjust the debounce delay (e.g., 300 milliseconds)

    const getMenuItems = (e) => {
        // Call the debounced function when the user types
        debouncedGetMenuItems(e.target.value);
    };

    const hideMenuItem = () => {
        setDisplayMenu(false);
    };

    return (
        <div className={`${classes.searchContainer}  ${props.className}`}>
            {props?.label && <InputLabel className={classes.inputLabel}>{props?.label}</InputLabel>}
            <TextField
                id="outlined-start-adornment"
                className={classes.search}
                placeholder="Find fellow blabberes..."
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon className={classes.searchIcon} /></InputAdornment>,
                }}
                onChange={getMenuItems}
                onBlur={hideMenuItem}
            />
            {displayMenu && (
                <div className={classes.dropDown}>
                    {menuItems?.length > 0 ? (
                        menuItems?.map((item, index) => (
                            <div className={classes.menuItem} key={index}>
                                <ProfilePic src={item.profilePic} />
                                <span>{item.name}</span>
                            </div>
                        ))
                    ) : (
                        <span className={classes.notFound}>
                            <DoNotDisturbAltIcon /> Blabberer not found
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
