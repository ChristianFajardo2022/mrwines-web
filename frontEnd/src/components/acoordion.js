import  React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddBoxIcon from "@mui/icons-material/AddBox";
import topicActions from "../redux/actions/topicActions";
import { connect } from "react-redux";


 function SimpleAccordion(props) {
    const [detalleText, setdetalleText] = useState("");
  const [dateTitle, setdateTitle] = useState("");
 
  async function addNote() {
    const commentData = {
      title: dateTitle,
      text: detalleText,
    }; 
   
    await props.uploadTopic(commentData);
   
  }

  async function aggNote() {
    const commentData = {
      
    }
  }
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        >
          <Typography>Ingresa tu tema</Typography>
        </AccordionSummary>
        <AccordionDetails style={{  display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
        <TextareaAutosize
        onInput={(event) => setdateTitle(event.target.value)}
        aria-label="empty textarea"
        placeholder="Ingresa el titulo"
        style={{ width: 300, marginBottom: 20 }}
      />
      <TextareaAutosize
      onInput={(event) => setdetalleText(event.target.value)}
        aria-label="empty textarea"
        placeholder="Ingresa el texto"
        style={{ width: 600, height: 100 }}
      />
      <AddBoxIcon
      onClick={() => {
        addNote();
      }}
    />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
const mapDispatchToProps = {
    uploadTopic: topicActions.uploadTopic,
  };
  
  export default connect(null, mapDispatchToProps )(SimpleAccordion)