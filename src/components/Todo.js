import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Todos from './Todos';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const useStyles = makeStyles({
container:{
    width:'100%',
    height:'100vh',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
},
containerCenter:{
    margin:'2rem',
    width:'30rem',
    height:'35rem',
    display:'flex',
    alignItems:'center',
    overflow:'scroll',
},
formContainer:{
    margin:'1rem',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:'1rem',
},
'@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
    '*::-webkit-scrollbar-corner': {
      display:'none',
    },
  }
});

const Todo =()=>{
    const classes=useStyles();
    const [todo,setTodo]=useState('');
    const [todoList,setTodoList]=useState([]);
    const axios = require('axios');


    //data fetching
    useEffect(async()=>{
            const result= await axios.get('http://localhost:8000/todos');
            setTodoList(result.data);
    },[]);
    

    /*생성*/
    const handleSubmit=async(e)=>{
            e.preventDefault();
            axios('http://localhost:8000/todos',{
                method:'post',
                headers:{"Content-Type":"application/json"},
                data:{
                    id:Math.random(),
                    text:todo,
                    completed:false,
                }
            }).then((res)=>{
                setTodoList([...todoList].concat(res.data))
            })
        }
        
    /*삭제*/
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:8000/todos/${id}`);
        const newTodo=todoList.filter((todo)=>todo.id!==id);
        setTodoList(newTodo);
    }
    
    /*Checked*/
    const toggleComplete=(id)=>{
        const checkedTodo=todoList.map((todo)=>{
            if(todo.id===id){
                const newCompleted=todo.completed=!todo.completed;
                axios.patch(`http://localhost:8000/todos/${id}`,{
                completed:newCompleted,
                })
        }
            return todo
        })
        setTodoList(checkedTodo);
    }



    return (
        <Box style={{backgroundColor:'powderblue'}}> 
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography style={{margin:'0 auto'}} variant="h4" color="inherit" component="div">
                TODO
                </Typography>
            </Toolbar>
        </AppBar>
        <Box className={classes.container} >
            <form className={classes.formContainer} onSubmit={handleSubmit}>
            <TextField style={{maxwidth:'20rem'}}
            placeholder="Add Your New Todo"
            id="outlined-basic" 
            size="small"
            value={todo}
            onChange={(e)=>setTodo(e.target.value)} />
            <Button type="submit" size="large" variant="contained" endIcon={<AddCircleOutlineIcon />}>
                Add
            </Button>
        </form>
        <Container maxWidth="sm" className={classes.containerCenter}>
            {todoList.length===0 ? (<div style={{textAlign:'center'}}>
                <h2>No Data</h2>
            </div>)
            :
            <div style={{display:'flex',flexDirection:'column',margin:'1rem',alignItems:'center',justifyContent:'center'}}>
                {todoList.map((todo)=>(
                    <Todos 
                        todo={todo} 
                        handleDelete={handleDelete} 
                        toggleComplete={toggleComplete}
                        key={todo.id}/>
                ))}
            </div>
            }
        </Container>
        </Box>
        </Box>
    );
}

export default Todo; 