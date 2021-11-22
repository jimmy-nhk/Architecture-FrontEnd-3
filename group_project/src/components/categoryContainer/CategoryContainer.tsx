import React from 'react'
import Box from "@mui/material/Box";
import CategoryPost from '../postCategory/CategoryPost';

function CategoryContainer() {
    return (
        <div style={{marginBottom: "10px"}}>
      <Box
        sx={{
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
