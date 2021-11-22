import { FavoriteOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, AvatarGroup, Avatar, Link } from "@mui/material";
import Tag from "./Tag";

const tags = [
  'lorem', 'ipsum', 'dolor','consectetur'
];

export default function HeaderSection() {
  return (
    <>
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
              <Tag key={tag} name={tag} />
            ))}
          </div>              
        </Box>
      </Box>
    </>
  )
}