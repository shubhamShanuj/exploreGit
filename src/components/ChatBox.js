import React from 'react'
import Box from '@material-ui/core/Box'
import { Button, TextField } from '@material-ui/core'

class ChatBox extends React.Component{
    render(){
        return(
            <center>
                <form noValidate autoComplete="off" >
                    <TextField id="filled-basic" label="Message" variant="filled" fullWidth onClick/>
                </form>
          </center>
        )
    }
}

export default ChatBox;
