import { FavoriteOutlined } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, Container, CssBaseline, Grid, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import PostLayout from "../../generic/layout/PostLayout";

const tags = ['voluptatem', 'accusantium', 'doloremque']

const PostPage = () => {
  return (
    <PostLayout>
      <>
      <div style={{ 
          height: '100vh',
          minHeight: '560px',
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
          display: 'flex', flexWrap: 'wrap', flexDirection: "column", justifyContent: 'center'
        }}>
        <CssBaseline />
        <div style={{ 
          width: "100%", height: "100%", 
          position: 'absolute', left: 0, top: 0,
          display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center'}}>
          <div style={{
              margin: "150px",
              display: "flex", flexWrap: 'nowrap',
              bottom: '0', left: '0', position: 'absolute', 
              backgroundColor: "white"
            }}>
            <Typography variant="h1" sx={{ 
                fontWeight: "bold", 
                textAlign: "left",
              }}>
              Lorem ipsum dolor sit amet
            </Typography>
          </div>
        </div>
      </div>
      <Container maxWidth="lg" sx={{ margin: "100px auto" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Typography variant="h3" sx={{ 
                fontWeight: "bold", 
                textAlign: "left",
              }}>
              Consectetur adipiscing dolor
            </Typography>
            <Typography variant="subtitle1" maxWidth="sm" sx={{ 
                fontSize: "21px",
                color: "gray", 
                marginBottom: "40px"
              }}>
                Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", flexShrink: 1 }}>
            <IconButton size="large" color="secondary">
              <FavoriteOutlined />
            </IconButton>
            <Typography variant="button" sx={{ 
                fontWeight: "bold",
                textAlign: "center",
              }}>
              43 likes
            </Typography>              
          </Box>
        </Box>
        <Box sx={{ marginBottom: "50px", display: "flex", flexDirection: "row"}}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="button" sx={{ 
                fontWeight: "bold",
              }}>
              Author(s)
            </Typography>
            <AvatarGroup max={4} sx={{ justifyContent: "flex-end" }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="button" sx={{ 
                fontWeight: "bold"
              }}>
              Category
            </Typography>
            <div>
              <Link sx={{ marginTop: "10px" }} underline="hover" href="#">
                Sed ut perspiciatis
              </Link>
            </div>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="button" sx={{ 
                fontWeight: "bold"
              }}>
              TAGS
            </Typography>
            <div style={{ marginTop: "10px" }}>
              { tags.map((tag) => (
                <Link key={tag} sx={{ 
                  borderRadius: "5px", color: "white",
                  marginRight: "5px", padding: "2px 8px", 
                  backgroundColor: "#2196f3" }} underline="hover" href="#">
                  {tag}
                </Link>
              ))}
            </div>              
          </Box>
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <iframe width="100%" height="500px" src="https://www.youtube.com/embed/Kw10EgFPxdg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Box>
        <Box>
        <Typography variant="body1" sx={{ fontSize: "20px" }} >
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
          <br />
          <br />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img style={{ width: "100%"}} alt="" src="https://source.unsplash.com/random" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontSize: "20px" }} >
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                <br />
                <br />
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
              </Typography>
            </Grid>
          </Grid>
          <br />
          <br />
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          <br />
          <br />
          This section is for the @mui rich text editor content. 
        </Typography>
        </Box>
      </Container>
      </>
  </PostLayout>
  );
}

export default PostPage;
