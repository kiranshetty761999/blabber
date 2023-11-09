import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import classes from './SearchBar.module.css'

const SearchBar = (props) => {
    return (
        <div className={ `${classes.searchContainer}  ${props.className}`}>
            <TextField
                id="outlined-start-adornment"
                className={classes.search}
                placeholder='Find fellow blabberes...'
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon className={classes.searchIcon} /></InputAdornment>,
                }}
            />

            {/* <div className={ `${classes.dropDown} glassmorphismCss `}>
                <div className={classes.menuItem}>hello</div>
                <div className={classes.menuItem}>hello</div>
                <div className={classes.menuItem}>hello</div>
                <div className={classes.menuItem}>hello</div>
            </div> */}


        </div>
    )
}

export default SearchBar