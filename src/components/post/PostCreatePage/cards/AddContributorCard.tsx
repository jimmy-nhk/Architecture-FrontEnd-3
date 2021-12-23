import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  CardActions,
  TextField,
} from "@mui/material";
import * as React from "react";

interface Contributor {
  id: number;
  name: string;
}

interface IContributorCardProps {
  contributor: Contributor[];
  updatePostContributor: (arg: Contributor[]) => void;
}

const AddContributorCard: React.FC<IContributorCardProps> = ({
  contributor,
  updatePostContributor,
}) => {
  const onContributorChange = (e: any, c:Contributor) => {
    console.log('onContributorChange=', e.target.value)
    var contributorList = contributor
    contributorList[c.id].name = e.target.value
    // contributor[c.id].name = e.target.value
    updatePostContributor(contributorList);
   

  };

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contributors
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {contributor.map((c) => {
            console.log(c)
            return (
            <Box
              sx={{ display: "flex", alignItems: "flex-end", marginTop: "5px" }}>
              <Avatar sx={{ marginRight: "10px" }} alt="?" src="" />
              <TextField
                fullWidth
                id={String(c.id)}
                label={"Contributor " + (c.id + 1)} 
                variant="standard"
                value={c.name}
                onChange={(e) => onContributorChange(e, c)}/>
            </Box>
          )})}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Add contributor</Button>
      </CardActions>
    </Card>
  );
};

export default AddContributorCard;
