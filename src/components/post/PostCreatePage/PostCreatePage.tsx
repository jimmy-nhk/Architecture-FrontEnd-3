import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import AddContributorCard from "./cards/AddContributorCard";
import MetadataCard from "./cards/MetadataCard";
import TitleAndContentCard from "./cards/TitleAndContentCard";
import UploadImageCard from "./cards/UploadImageCard";

const PostCreatePage = () => {
  return (
    <DefaultLayout style={{ backgroundColor: "#f3f3f4"}}>
      <Container maxWidth="lg" sx={{ padding: "6.5rem 0", margin: "0 auto" }}>
        <Box sx={{ display: "flex", paddingTop: "50px", paddingBottom: "20px"}}>
          <Typography variant="h4" sx={{ flexGrow: 1, alignSelf: "flex-end"}}>
            Create a post
          </Typography>
          <Button variant="contained" size="large">
            Create
          </Button>          
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TitleAndContentCard />
          </Grid>
          <Grid item xs={12} md={4} >
            <UploadImageCard />
            <AddContributorCard />
            <MetadataCard />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}

export default PostCreatePage;
