import React from 'react'
import Box from "@mui/material/Box";
import CategoryPost from '../postCategory/CategoryPost';
import {Link} from 'react-router-dom';

function CategoryContainer() {
  
  const categories=[{
    "id": 1,
    "name": "Engineering",
    "description": "The most innovative minds"
  },{
    "id": 2,
    "name": "Design",
    "description": "Intelligence made visible"
  },{
    "id": 3,
    "name": "Business",
    "description": "Entrepreneurship begins"
  },{
    "id": 4,
    "name": "Professional Communication",
    "description": "Public relation made compelling"
  }]

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
        {categories.map((category)=>(
          <Link to='/posts'>
            <CategoryPost category = {category} />
          </Link>
        ))}

      </Box>
        </div>
    )
}

export default CategoryContainer
