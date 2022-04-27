//importo de librerias externas
import React, {useEffect, useState} from 'react'
import {Box, Typography} from '@mui/material'
import {Link as LinkRouter} from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {connect} from 'react-redux'
import topicActions from '../redux/actions/topicActions'
import TextareaAutosize from '@mui/base/TextareaAutosize';

function Comments(props) {

    //console.log(props)

    const [note, setNote] = useState(props.note)
    const [comments,setComments] = useState(props.note.comments)
    const [inputText,setInputText] = useState("")
    const [reload,setReload] = useState(false)
    const [newButton,setNewButton] = useState(false)

    useEffect(() => {  
        props.getOneTopic(props.note._id)
            .then(res => setNote(...res))
            //console.log(note)
    }, [reload])

    async function toAdd(event) {
        const commentData = {
            topicId: note._id,
            comment: inputText
        }   
        await props.addComment(commentData)
        setInputText("")
        setReload(!reload)
    }
    
    async function toModify(event) {
        event.preventDefault()
        const commentData = {
            commentId: event.target.id,
            comment: comments,
        }
        await props.modifyComment(commentData)
        setReload(!reload)
        setNewButton(false)
    }

    function toChangeInputs(event) {
        setNewButton(true)
    }
    
    async function toDelete(event) {
        await props.deleteComment(event.target.id)
        setReload(!reload)
    }

    return (
        <>
        <div className='containerComments'>
            {note.comments?.map((comment) =>
                (props.user ?
                    (props.user.id !== comment.userId._id ? 
                        <Box key={comment._id} sx={{margin: '8px 0', padding: '8px',  display: 'flex', alignItems:'center', color: 'white', backgroundColor: 'black', border:'1px solid #333', borderRadius:'15px'}}>
                            <div>
                                <img className="photoPadlet commentPhoto" alt={comment.userId.name} src={comment.userId.userPhoto} />
                            </div>
                            <Box sx={{paddingLeft: '8px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Typography variant='h6' sx={{width: '100%'}}>{comment.userId.userName}</Typography>
                                <TextareaAutosize className='textarea textareaSize' variant="subtitle2" disabled sx={{width: '100%', display: 'flex', padding: '8px', maxRows:'12', color: 'black', backgroundColor: 'white', border:'1px solid #333', borderRadius:'5px'}}>{comment.comment}
                                </TextareaAutosize>
                            </Box>
                        </Box> 
                        :
                        <Box key={comment._id} sx={{margin: '8px 0', padding: '8px',  display: 'flex', alignItems:'center', color: 'white', backgroundColor: '#333', border:'1px solid #333', borderRadius:'15px'}}>
                            <div>
                                <img className="photoPadlet commentPhoto" alt={comment.userId.name} src={comment.userId.userPhoto} />
                            </div>
                            <Box sx={{paddingLeft: '8px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Typography variant='h6' sx={{width: '100%', color: 'white'}}>{comment.userId.userName}</Typography>
                                <Box sx={{width: '100%', display: 'flex', alignItems:'center', paddingLeft: '0'}}>
                                    {newButton ? 
                                    <>
                                        <TextareaAutosize className='textarea textareaSize' maxRows='12' onChange={(event) => setComments(event.target.value)} defaultValue={comment.comment}/>
                                        <EditIcon id={comment._id} onClick={toModify} sx={{bgcolor: 'black', '&:hover': {bgcolor: 'rgb(178, 18, 52)'}, padding: '5px', margin: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} />
                                    </> : <>
                                        <TextareaAutosize className='textarea textareaSize' maxRows='12' disabled onChange={(event) => setComments(event.target.value)} defaultValue={comment.comment} />
                                        <EditIcon id={comment._id} onClick={toChangeInputs} sx={{bgcolor: 'black', '&:hover': {bgcolor: 'rgb(178, 18, 52)'}, padding: '5px', margin: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} />
                                    </>
                                    }
                                    <DeleteIcon id={comment._id} onClick={toDelete} sx={{bgcolor: 'black', '&:hover': {bgcolor: 'rgb(178, 18, 52)'}, padding: '5px', marginTop: '5px', marginBottom: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} />
                                </Box>
                            </Box>
                        </Box>
                    ) 
                    : 
                    (
                        <Box key={comment._id} sx={{margin: '8px 0', padding: '8px',  display: 'flex', alignItems:'center', color: 'white', backgroundColor: 'black', border:'1px solid #333', borderRadius:'15px'}}>
                            <div>
                                <img className="photoPadlet commentPhoto" alt={comment.userId.name} src={comment.userId.userPhoto} />
                            </div>
                            <Box sx={{paddingLeft: '8px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Typography variant='h6' sx={{width: '100%'}}>{comment.userId.userName}</Typography>
                                <TextareaAutosize className='textarea textareaSize' variant="subtitle2" disabled sx={{width: '100%', display: 'flex', padding: '8px', maxRows:'12', color: 'black', backgroundColor: 'white', border:'1px solid #333', borderRadius:'5px'}}>{comment.comment}
                                </TextareaAutosize>
                            </Box>
                        </Box> 
                    )
                )
            )}
        </div>
        <div>
            {props.user ?
                (<Box sx={{margin: '8px 0', padding: '8px', display: 'flex', color: 'black', backgroundColor: 'white', border:'1px solid #333', borderRadius:'15px'}}>
                    <div className='divImgComment2'>
                        <img  className="photoPadlet commentPhoto" alt={props.user.userName} src={props.user.userPhoto} />
                    </div>
                    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Box sx={{width: '100%', display: 'flex', alignItems:'center', paddingLeft: '8px', paddingRigth: '8px'}}>
                            <TextareaAutosize className="textarea textareaSize" maxRows='12' onChange={(event) => setInputText(event.target.value)} value={inputText} />
                            <AddIcon onClick={toAdd} sx={{bgcolor: 'black', '&:hover': {bgcolor: 'rgb(178, 18, 52)'}, padding: '3px', margin: '5px', marginRigth: '0', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}}/>
                        </Box>
                    </Box>
                </Box>
                ) : (
                <Box sx={{margin: '8px 0', padding: '8px', display: 'flex', color: 'black', backgroundColor: 'white', border:'1px solid #333', borderRadius:'15px'}}>
                    <h3><LinkRouter className='textDecorationNewComment' to={'/signIn'}>Log in</LinkRouter> to add a comment!</h3>
                </Box>
                )
            }
        </div>
        </>
    )
}

const mapDispatchToProps = {
    addComment: topicActions.addComment,
    modifyComment: topicActions.modifyComment,
    deleteComment: topicActions.deleteComment,
    getOneTopic: topicActions.getOneTopic
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments)