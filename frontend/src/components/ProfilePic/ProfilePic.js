import classes from './ProfilePic.module.css'

const ProfilePic = (props)=>{
    return(
        <img src={props.src} alt="Chat image" className={classes.profile}/>
    )
}

export default ProfilePic;