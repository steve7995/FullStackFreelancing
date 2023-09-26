import React from 'react';
import { useState,useEffect } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Login=()=>{
  const navigate = useNavigate();
    const [usnam, setusnam] = useState("");
    const [eml, seteml] = useState("");

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

  const addaduser = async (event) => {
    event.preventDefault();
    axios
      .post("https://wbdservicet1.azurewebsites.net/admin/signin", {
        usnam: usnam,
        eml: eml,
      })
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
    return(
      <form>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required 
                value={usnam}
                onChange={(e) => {
                setusnam(e.target.value);
                }}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
                value={eml}
                onChange={(e) => {
                seteml(e.target.value);
                }}
                
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit'  color='primary' variant="contained" style={btnstyle} onSubmit={addaduser}>
                  Sign in
                  </Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
        </form>
    )
}

export default Login;