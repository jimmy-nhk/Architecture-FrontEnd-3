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
      <Box sx={{ marginBottom: "20px" }}>
        <iframe
          width="100%"
          height="500px"
          src="https://www.youtube.com/embed/Kw10EgFPxdg"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontSize: "20px" }} id="body-content">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga.
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img
                style={{ width: "100%" }}
                alt=""
                src="https://source.unsplash.com/random"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                Temporibus autem quibusdam et aut officiis debitis aut rerum
                necessitatibus saepe eveniet ut et voluptates repudiandae sint
                et molestiae non recusandae. Itaque earum rerum hic tenetur a
                sapiente delectus, ut aut reiciendis voluptatibus maiores alias
                consequatur aut perferendis doloribus asperiores repellat.
                <br />
                <br />
                Et harum quidem rerum facilis est et expedita distinctio. Nam
                libero tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus id quod maxime placeat facere possimus, omnis
                voluptas assumenda est, omnis dolor repellendus.
              </Typography>
            </Grid>
          </Grid>
          <br />
          <br />
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?
          <br />
          <br />
          This section is for the @mui rich text editor content.
          {/* <div dangerouslySetInnerHTML={{ __html: sanitize(text) }}></div> */}
          <div
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </Typography>
      </Box>
    </>
  );
};

export default BodySection;
