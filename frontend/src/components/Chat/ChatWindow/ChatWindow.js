import ProfilePic from "../../ProfilePic/ProfilePic"
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import classes from './ChatWindow.module.css'

const ChatWindow = ()=>{

    return(
    <div style={{height:'100vh',position:'relative'}}>
        <div style={{height:'2rem',backgroundColor:'#496DDB',padding:'1rem',display:'flex',alignItems:'center',gap:25}}>
            <ProfilePic src="https://picsum.photos/200/300"/> 
        <h3 style={{color:'#fff'}}>Bhai log ka group</h3>

        </div>
        <div >
            <div style={{display:'flex',justifyContent:'left'}}>
                <span style={{borderRadius:'20px',padding:'1rem',margin:'1rem',backgroundColor:'#E6E1C5',justifyContent:'left'}}>Hellps</span>
            </div>
            <div  style={{display:'flex',justifyContent:'right'}}>
                <span style={{borderRadius:'20px',padding:'1rem',margin:'1rem',backgroundColor:'#8F95D3',justifyContent:'right'}}>Hi</span>
            </div>

          
        </div>
        <div style={{position:'absolute',bottom:0,right:0,left:0,height:'4rem'}}>
        <TextField
                id="outlined-start-adornment"
                className={classes.typingSection}
                placeholder='Share Your Blab!'
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SendIcon className={classes.searchIcon} /></InputAdornment>,
                }}
            />
        </div>
    </div>)
}

export default ChatWindow