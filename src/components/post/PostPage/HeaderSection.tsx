import {FavoriteOutlined} from "@mui/icons-material";
import {Avatar, AvatarGroup, Box, IconButton, Link, Typography,Tooltip} from "@mui/material";
import {useEffect, useState} from "react";
import Tag from "./Tag";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";

interface IHeaderSectionProps {
    title: string;
    category: string;
    tags: string;
    contributors: string;
    likedCount: number;
}

const HeaderSection: React.FC<IHeaderSectionProps> = ({
        title, category, tags, contributors, likedCount
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
            <Box sx={{display: "flex"}}>
                <Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                    <Typography variant="h3" sx={{
                        fontWeight: "bold",
                        textAlign: "left",
                    }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", flexShrink: 1}}>
                    <IconButton size="large" color="secondary">
                        <FavoriteOutlined/>
                    </IconButton>
                    <Typography variant="button" sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>
                        {likedCount} likes
                    </Typography>
                </Box>
            </Box>
            <Box sx={{marginBottom: "50px", display: "flex", flexDirection: "row"}}>
                {/*     AUTHORS     */}
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="button" sx={{
                        fontWeight: "bold",
                    }}>
                        Author(s)
                    </Typography>
                    <AvatarGroup max={8} sx={{justifyContent: "flex-end"}}>
                        {contributorArr.map((c, i) =>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 500 }}
                                title={c}>
                                <Avatar alt={c} src={`/static/images/avatar/${i + 1}.jpg`}   />
                            </Tooltip>

                        )}
                    </AvatarGroup>
                </Box>

                {/*     CATEGORY     */}
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="button" sx={{
                        fontWeight: "bold"
                    }}>
                        Category
                    </Typography>
                    <div>
                        <Link sx={{marginTop: "10px"}} underline="hover" href="#">
                            {category}
                        </Link>
                    </div>
                </Box>

                {/*     TAGS     */}
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="button" sx={{
                        fontWeight: "bold"
                    }}>
                        TAGS
                    </Typography>
                    <div style={{marginTop: "10px"}}>
                        {tagArr.map((tag) => (
                            <Tag key={tag} name={tag}/>
                        ))}
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default HeaderSection;