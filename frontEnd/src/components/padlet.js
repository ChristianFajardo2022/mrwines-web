//from react
import * as React from 'react';
import {useState,useEffect} from "react"

//from redux
import {connect} from "react-redux"
import topicActions from "../redux/actions/topicActions"

//from app
import "../styles/blog.css"
import Comments from './comments'

//from libraries
import {styled} from "@mui/material/styles"
import EditIcon from "@mui/icons-material/Edit"
import IconButton from "@mui/material/IconButton"
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {Typography} from '@mui/material'

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
function Padlet(props) {

    //console.log(props)

    const [note, setNote] = useState(props.note)
    const [title,setTitle] = useState(props.note.title)
    const [text,setText] = useState(props.note.text)
    const [newButton,setNewButton] = useState(false)
    const [reload, setReload] =useState(false)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    useEffect(() => {  
        props.getOneTopic(props.note._id)
          .then(res => setNote(...res))
          //console.log(note)
    }, [reload])

    async function modifyNote(event) {
      event.preventDefault()
        const commentData = {
          id: props.note._id,
          title: title,
          text: text
        }
        await props.modifyTopic(commentData)
        setReload(!reload)
        setNewButton(false)
    }

    function toChangeInputs(event) {
        setNewButton(true)
    }

    async function toLike() {
        await props.likeTopic(props.note._id)
        setReload(!reload)
    }

    return (
    <div className="containerPadlet">
        <div>
            <img className="photoPadlet" alt={note.userTopic._id} src={note.userTopic.userPhoto} />
            <h2>{note.userTopic.userName}</h2>
        </div>
        {props.user ?
            (props.user.id === props.note.userTopic._id ? 
              (<div className='padleTopic'>
                <div className="borderTop">
                    {newButton ? 
                    <>  
                        <textarea className="textarea text-blog titleBlog" onChange={(event) => setTitle(event.target.value)} defaultValue={note.title} />
                        <div className="nameEdit-padlet">
                            <textarea className="textarea text-blog bodyBlog" onChange={(event) => setText(event.target.value)} defaultValue={note.text} />
                            <EditIcon sx={{bgcolor: 'rgb(178, 18, 52)', padding: '5px', margin: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}}  id={note._id} onClick={modifyNote} />
                        </div>
                    </> : <>
                        <textarea className="textarea text-blog titleBlog" disabled value={note.title} />
                        <div className="nameEdit-padlet">
                            <textarea className="textarea text-blog bodyBlog" disabled value={note.text} />
                            <EditIcon sx={{bgcolor: 'black', '&:hover': {bgcolor: 'rgb(178, 18, 52)'}, padding: '5px', margin: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} id={note._id} onClick={toChangeInputs} />
                        </div>
                    </>
                    }
                    <IconButton onClick={toLike} aria-label="cart">
                        {note.likes.includes(props.user.id) ?
                            <FavoriteIcon sx={{color: 'rgb(178 18 52)'}}/> :
                            <FavoriteBorderIcon />}
                        <Typography sx={{color: 'black', paddingLeft: '5px'}}>{note.likes.length} likes</Typography>
                    </IconButton>
                </div>
            </div>) : 
            (<div className='padleTopic'>
                <div className="borderTop">
                    <textarea className="textarea text-blog titleBlog" disabled value={note.title} />
                    <textarea className="textarea text-blog bodyBlog" disabled value={note.text} />
                    <IconButton onClick={toLike} aria-label="cart">
                        {note.likes.includes(props.user.id) ?
                            <FavoriteIcon sx={{color: 'rgb(178 18 52)'}}/> :
                            <FavoriteBorderIcon />}
                        <Typography sx={{color: 'black', paddingLeft: '5px'}}>{note.likes.length} likes</Typography>
                    </IconButton>
                </div>
            </div>)
          ) : ( <>
                <div className="borderTop">
                    <textarea className="textarea text-blog titleBlog" disabled value={note.title} />
                    <textarea className="textarea text-blog bodyBlog" disabled value={note.text} />
                    <IconButton aria-label="cart">
                        <FavoriteBorderIcon />
                        <Typography sx={{color: 'black', paddingLeft: '5px'}}>{note.likes.length} likes</Typography>
                    </IconButton>
                </div>
            </>
          )
        }
    <CardActions>
        <h3>Comments</h3>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon/>
        </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Comments note={props.note} />
        </CardContent>
    </Collapse>
    </div>
    )
}

const mapDispatchToProps = {
    getOneTopic: topicActions.getOneTopic,
    modifyTopic: topicActions.modifyTopic,
    likeTopic: topicActions.likeTopic
}

const mapStateToProps = (state) => {
    return {user: state.userReducer.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(Padlet)