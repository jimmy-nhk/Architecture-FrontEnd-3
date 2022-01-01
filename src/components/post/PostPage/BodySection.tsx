import { Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";

interface IBodySectionProps {
  bodyText: string;
}

const BodySection: React.FC<IBodySectionProps> = ({ bodyText }) => {
  const [text, setText] = useState("");
  // const sanitize = dompurify.sanitize;

  useEffect(() => {
    var re = /(\\")/;
    setText(bodyText.replace(re, `"`));
  }, [bodyText]);

  return (
    <>
      <Box>
        <Typography variant="body1" sx={{ fontSize: "20px"  }} id="body-content">
          <div
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </Typography>
      </Box>
    </>
  );
};

export default BodySection;
