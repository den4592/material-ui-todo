import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import axios from 'axios';
import { ClassNames } from '@emotion/react';
import { style } from '@mui/system';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const useStyles = makeStyles({

});


const Todos = ({todo,handleDelete,toggleComplete}) => {
    const classes=useStyles();
    const {text}=todo;
    const [newText,setNewText]=useState(text);

    const handleSave=(id)=>{
        axios.patch(`http://localhost:8000/todos/${id}`,{
            text:newText,})
            
        }
    
    return ( 
        <Container style={{
            border:'1px solid black',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            marginBottom:'1rem',
            position:'relative',
        }}>

            <EditText
            name='textbox'
            style={{display:'flex',alignItems:'center'}}
            value={newText}
            onChange={setNewText}
            onSave={handleSave(todo.id)}
          />
            <Box sx={{
                position:'absolute',
                right:'0',
                display:'flex',
                alignItems:'center',
                justifyContent:'space-around',
                }}>

                <Checkbox 
                    id="cBox"
                    onChange={()=>toggleComplete(todo.id)} {...label} 
                    checked={todo.completed}
                />
                <IconButton 
                    onClick={()=>handleDelete(todo.id)} color="primary">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Container>
     );
}
 
export default Todos;