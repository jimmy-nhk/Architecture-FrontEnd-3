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
import { Contributor } from "../PostCreatePage";

interface IContributorCardProps {
  contributors: Contributor[];
  updatePostContributors: (arg: Contributor[]) => void;
}

const AddContributorCard: React.FC<IContributorCardProps> = ({
  contributors: contributors,
  updatePostContributors: updatePostContributors,
}) => {
  const onContributorChange = (e: any, c: Contributor) => {
    var contributorList: Contributor[] = contributors;
    contributorList[c.id].name = e.target.value;
    updatePostContributors(contributorList);
  };

  const handleAddContributor = (e: any) => {
    const maxId = contributors.length
    var contributorList:Contributor[] = contributors;
    contributorList.push({
      id: maxId,
      name: ''
    })
    updatePostContributors(contributorList);
  }

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contributors
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {contributors.map((c) => {
            console.log(c);
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "5px",
                }}
              >
                <Avatar sx={{ marginRight: "10px" }} alt="?" src="" />
                <TextField
                  fullWidth
                  id={String(c.id)}
                  label={"Contributor " + (c.id + 1)}
                  variant="standard"
                  value={c.name}
                  onChange={(e) => onContributorChange(e, c)}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => handleAddContributor(e)}>
          Add contributor
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddContributorCard;
