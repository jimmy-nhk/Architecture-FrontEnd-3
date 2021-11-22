import React from 'react'
import Box from "@mui/material/Box";
import CategoryPost from '../postCategory/CategoryPost';

function CategoryContainer() {
    return (
        <div  style={{marginLeft: "10%", marginRight: "15%" , marginTop:"2vw"}}>
      <Box
        sx={{
          width:"100%",
          display: 'flex',

          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'flex-start',

        }}

      >
        <CategoryPost />
        <CategoryPost />
        <CategoryPost />
        <CategoryPost />

      </Box>
        </div>
    )
}

export default CategoryContainer
