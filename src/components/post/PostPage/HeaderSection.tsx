import { FavoriteOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, AvatarGroup, Avatar, Link } from "@mui/material";
import { useEffect, useState } from "react";
import Tag from "./Tag";

interface IHeaderSectionProps {
  category: string;
  tags: string;
  contributors: string;
  likedCount: number;
}

const HeaderSection: React.FC<IHeaderSectionProps> = ({
  category, tags, contributors, likedCount
}) => {
  const [tagArr, setTagArr] = useState<string[]>(['', ''])
  const [contributorArr, setContributorArr] = useState<string[]>(['', ''])

  useEffect(() => {
    var arr = tags.split(';');
    arr = arr.map((x) => x.trim())
    setTagArr(arr)
  }, [tags])

  useEffect(() => {
    var arr = contributors.split(';');
    arr = arr.map((x) => x.trim())
    setContributorArr(arr)
  }, [contributors])

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
            {likedCount} likes
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
            {contributorArr.map((c, i) => 
              <Avatar alt={c} src={`/static/images/avatar/${i + 1}.jpg`} />
            )}
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
              {category}
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
            { tagArr.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>              
        </Box>
      </Box>
    </>
  )
}

export default HeaderSection;