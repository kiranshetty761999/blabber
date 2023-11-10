import React from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import classes from './ChatList.module.css';
import moment from 'moment'
import MessageNumber from '../../MessageNumber/MessageNumber';
import Groups2Icon from '@mui/icons-material/Groups2';
import ProfilePic from '../../ProfilePic/ProfilePic';
import CreateGroup from '../../CreateGroupModal/CreateGroup';

const ChatList = () => {
  const listOfChats = [
    {
      "_id": "654afa8209e363dfc27f4c8b",
      "isGroupChat": false,
      "users": [
        {
          "_id": "654332e068e42cc7f44a8922",
          "name": "kiran shetcty",
          "email": "kiran.shetty@gmail.com",
          "profilePic": "cmkldncdc@eqkldwc.com",
          "__v": 0
        },
        {
          "_id": "6549cb5c066ac1e20976f2bc",
          "name": "kishan",
          "email": "kishanshettytesting@gmail.com",
          "profilePic": "cdqwdcwcw.com",
          "createdAt": "2023-11-07T05:30:04.098Z",
          "updatedAt": "2023-11-07T05:30:04.098Z",
          "__v": 0
        }
      ],
      "chatName": "",
      "createdAt": "2023-11-08T03:03:30.846Z",
      "updatedAt": "2023-11-08T03:03:30.846Z",
      "__v": 0
    },
    {
      "_id": "654aff47c3e5fb2d7fb15a49",
      "isGroupChat": true,
      "groupAdmin": "654332e068e42cc7f44a8922",
      "chatName": "Bhai log ka group",
      "createdAt": "2023-11-08T03:23:51.376Z",
      "updatedAt": "2023-11-08T03:46:31.207Z",
      "__v": 0,
      "latestMessage": {
        "_id": "654b0497cc043c5673cc705f",
        "sentBy": "654332e068e42cc7f44a8922",
        "message": "this is to test the latest message",
        "chatId": "654aff47c3e5fb2d7fb15a49",
        "seenBy": [],
        "createdAt": "2023-11-08T03:46:31.161Z",
        "updatedAt": "2023-11-08T03:46:31.161Z",
        "__v": 0
      },
    },
    // Add more chat objects as needed
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <SearchBar className={classes.search} />
        <GroupAddIcon className={classes.groupAddIcon} />
        {/* <CreateGroup/> */}
      </div>
      <div className={classes.chatList}>
        {listOfChats.map((chat) => (
          <div key={chat._id} className={classes.chatItem}>
            <ProfilePic src="https://picsum.photos/200/300"/> 
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <h3 style={{ margin: 0 }} >{chat.chatName}</h3>
              <span>{chat.latestMessage?.message}</span>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Groups2Icon /> </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:15}}>
              <span>{moment(chat.createdAt).format('hh:mm A')}</span>
              <MessageNumber>4</MessageNumber>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
