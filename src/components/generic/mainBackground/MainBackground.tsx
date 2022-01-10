import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";

type CategoryDescription = {
  id: number,
  name: string,
  description: string,
  backgroundImage: string
}

const CATEGORY_DESCRIPTIONS : Array<CategoryDescription> = [
  {
    id: 1,
    name: "Engineering",
    description: "The most innovative minds",
    backgroundImage: "url(/images/engineering.jpg)"
  },
  {
    id: 2,
    name: "Design",
    description: "Intelligence made visible",
    backgroundImage: "url(/images/design.jpg)",
  },
  {
    id: 3,
    name: "Business",
    description: "Entrepreneurship begins",
    backgroundImage: "url(/images/business.jpg)",
  },
  {
    id: 4,
    name: "Professional Communication",
    description: "Public relation made compelling",
    backgroundImage: "url(/images/professional_communication.jpg)",
  },
];

interface IMainBackgroundProps {
  category: string | undefined
}

const MainBackground: React.FC<IMainBackgroundProps> = ({
  category: category
}) => {
  const [categoryDescription, setCategoryDescription] = useState<CategoryDescription |undefined>()

  useEffect(() => {
    let categoryDescription = CATEGORY_DESCRIPTIONS.find(categoryDescription => categoryDescription.name === category);

    console.log(categoryDescription)
    setCategoryDescription(categoryDescription)

    console.log("useEffect")
  }, [category])

  return (
    <div>
      <div 
        style={{backgroundImage: `${categoryDescription?.backgroundImage}` }} 
        className="main-background-container">
        <div className="overlay"></div>
        <div className="text-container">
          <h2>{categoryDescription?.name}</h2>
          <p>{categoryDescription?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MainBackground;
