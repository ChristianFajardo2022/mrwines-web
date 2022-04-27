//from react
import {useState,useEffect} from "react"

//from redux
import {connect} from "react-redux"
import topicActions from "../redux/actions/topicActions"

//from app
import "../styles/blog.css"
import LikeButton from './likeButton'

//from libraries
import {styled} from "@mui/material/styles"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Collapse from "@mui/material/Collapse"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteIcon from "@mui/icons-material/Favorite"
import IconButton from "@mui/material/IconButton"
// import MoreVertIcon from '@mui/icons-material/MoreVert'
import Typography from '@mui/material/Typography'


const ExpandMore = styled((props) => {
    const {expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
      transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {duration: theme.transitions.duration.shortest})
}))

function Padlet(props) {

    const [note, setNote] = useState(props.note)
    const [title,setTitle] = useState("")
    const [text,setText] = useState("")
    const [newButton,setNewButton] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [inputText, setInputText] = useState()
    const [reload, setReload] =useState(false)

    useEffect(() => {  
        props.getOneTopic(props.id).then((res) =>setNote(res))
    }, [reload])

    async function deleteNote(event) {
        await props.deleteTopic(event.target.id)
        setReload(!reload)
    }

    async function modifyNote(event) {
        const commentData = {
          id: note._id,
          title: title,
          text: text
        }   
        await props.uploadTopic(commentData)
        setNewButton(false)
        setReload(!reload)
    }

    function toChangeInputs(event) {
        setNewButton(true)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <>
        <h2>{note.title} - {note.userName}</h2>
        <p>{note.date}</p>
        <h4>{note.text}</h4>
            {props.user.id !== note.userTopic._id ? 
                <LikeButton /> : <>
                <DeleteIcon onClick={() => deleteNote(note._id)} />
                <EditIcon onClick={() => modifyNote()} />
                </>}
    {/* <div className="cardBlog">
      <Card sx={{ maxWidth: 345 }} className="Card">
        <CardHeader
          avatar={<Avatar aria-label="recipe">{notes?.userPhoto}</Avatar>}
          action={
            props.user  ? (
              <div className="iconblog">
              {props.user.userName === notes.userName ? ( <EditIcon onClick={() => {
                  updateNote(notes._id)
                }} />) : null}
               

              </div>
            ) : null
          }
          title={notes?.userName}
          subheader={new Date(notes.date).toUTCString()}
        />
{props.user ? ( props.user.userName === notes.userName ? (<CardContent>
  <div>
    <h3
      suppressContentEditableWarning={true}
      contentEditable
      onInput={(event) => setModifidTitle(event.currentTarget.textContent)}
    >{notes.title}</h3>
  </div>
  <div>
    <p
      suppressContentEditableWarning={true}
      contentEditable
      onInput={(event) => setModifidText(event.currentTarget.textContent)}
    > {notes?.text}</p>
  </div>
</CardContent>): ( 
  <>
  <div>
  <h3
    
  >{notes.title}</h3>
</div>
<div>
  <p
    
  > {notes?.text}</p>
</div>
</>) )
  : (<CardContent>
  <div>
    <h3
     
    >{notes.title}</h3>
  </div>
  <div>
    <p
     
    > {notes?.text}</p>
  </div>
</CardContent>)}
       
        <CardActions disableSpacing>
          <IconButton
          onClick={() => {
            likesOrDislikes(notes._id);
          }}
          aria-label="add to favorites">
            <FavoriteIcon />
            <p>{notes.likes.length}</p>
          </IconButton>
          <IconButton aria-label="share"></IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardHeader title="Comments" />
           
          {notes.comments.map((dato, index) => (

            <div className="CommentBody">
            <Avatar aria-label="recipe">{dato.profile}</Avatar>
              <h3>{dato.user}</h3> 
              <p className="Comment">{dato.comment}</p>
            </div>
     ))}
    

        <div className="BoxComment">
              <Typography>Leave your comment</Typography>
              <textarea className="textarea" onChange={(event) => setInputText(event.target.value)} />
              <button onClick={() => addComentar(notes._id)} className="btnComment">Comment</button>
            </div>    
           
    
            
          </CardContent>
        </Collapse>
      </Card>
    </div> */}
        </>
    )
}

const mapDispatchToProps = {
    getTopics: topicActions.getTopics,
    getOneTopic: topicActions.getOneTopic,
    likeTopic: topicActions.likeTopic,
    addComment: topicActions.addComment,
    deleteComment: topicActions.deleteComment,
    modifyComment: topicActions.modifyComment 
}

const mapStateToProps = (state) => {
    return { user: state.userReducer.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Padlet)