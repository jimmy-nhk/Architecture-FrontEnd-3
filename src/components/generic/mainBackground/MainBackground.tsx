import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";

const CATEGORY_DESCRIPTIONS = [
  {
    id: 1,
    name: "Engineering",
    description: "The most innovative minds",
    backgroundImage: "url(/images/engineering.jpg)",
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
  categoryId: string | undefined
}

const MainBackground: React.FC<IMainBackgroundProps> = ({
  categoryId: categoryId
}) => {
  const [categoryNum, setCategoryNum] = useState(2)

  useEffect(() => {
    setCategoryNum(Number(categoryId) - 1)
  }, [categoryId])

  return (
    <div>
      <div style={{backgroundImage: CATEGORY_DESCRIPTIONS[categoryNum].backgroundImage}} className="main-background-container">
        <div className="overlay"></div>
        <div className="text-container">
          <h2>{CATEGORY_DESCRIPTIONS[categoryNum].name}</h2>
          <p>{CATEGORY_DESCRIPTIONS[categoryNum].description}</p>
        </div>
      </div>
    </div>
  );
}

export default MainBackground;
