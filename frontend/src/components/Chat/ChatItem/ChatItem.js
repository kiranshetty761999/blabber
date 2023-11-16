import MessageNumber from "../../MessageNumber/MessageNumber"
import moment from 'moment'
import Groups2Icon from '@mui/icons-material/Groups2';
import ProfilePic from '../../ProfilePic/ProfilePic';
import classes from './ChatItem.module.css'

const ChatItem = (props) => {
    const { latestMessage, created, profileLink, _id, isGroupChat, chatName } = props

    return (
        <div key={_id} className={classes.container}>
            <div className={classes.item1} >
                <ProfilePic src={profileLink} />
            </div>
            <div className={classes.item2}>
                <p className={classes.chatName}>{chatName}</p>
                <div className={classes.latestMessage}>{latestMessage}</div>
            </div>
            <div className={classes.item3}>{isGroupChat && <Groups2Icon />} </div>
            <div className={classes.item4}>
                <span>{moment(created).format('hh:mm A')}</span>
                <MessageNumber>4</MessageNumber>
            </div>
        </div>

    )
}

export default ChatItem