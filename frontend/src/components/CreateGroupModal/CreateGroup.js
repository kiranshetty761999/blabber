import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SearchBar from '../SearchBar/SearchBar';
import CloseIcon from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search';
import classes from './CreateGroup.module.css'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


// isGroupChat: { type: Boolean, default: false },
// users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
// latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
// groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
// chatName: { type: String, trim: true }

const CreateGroup = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div >
            <Button onClick={handleOpen}>O</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={handleClose}>
                        <h3>Create your blabber gang...!</h3>
                        <CloseIcon style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                        <TextField id="outlined-basic" label="Whisper your blabber gang name" variant="outlined" sx={{ width: '100%' }} />
                    </div>
                    <SearchBar label="Add your fellow blabberers" className={classes.search} />
                    <CloudUploadOutlinedIcon sx={{ fontSize: '5rem', color: '#707070' }} />
                </Box>
            </Modal>
        </div>
    );
}

export default CreateGroup