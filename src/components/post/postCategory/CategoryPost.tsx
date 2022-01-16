import './style.css';

import React from 'react';

function CategoryPost(props:any) {
  let category = props['category']
  
  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        margin: "10px"
      }}
    >
      <div
        className="category-background-container"
      >
        <div className="overlay" style={{borderRadius: "5px"}}></div>
        <div className="text" style={{justifyItems: "center" }}>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CategoryPost;
