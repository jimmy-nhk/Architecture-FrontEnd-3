import { createTheme } from "@mui/material";
import { blue, red , blueGrey } from "@mui/material/colors";


const theme = createTheme({
    palette: {
        primary:{
            main: "#595959",
            // color: "gray"
        }
    },

    myButton: {
        backgroundColor: red[400],
        color: "white",
        border: "1px solid black"
    }
})

export default theme