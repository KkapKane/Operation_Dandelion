import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
export default function MuiNavbar() {
    return (
        <AppBar position="static">
            <Toolbar>
            <IconButton size='large' edge='start' color="inherit"> 
                TEST
            </IconButton>
            
            <Typography>HI</Typography>
            </Toolbar>


        </AppBar>
    )
}