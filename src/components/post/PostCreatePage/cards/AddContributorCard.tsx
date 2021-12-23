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
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

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
    const maxId = contributors.length;
    var contributorList: Contributor[] = contributors;
    contributorList.push({
      id: maxId,
      name: "",
    });
    updatePostContributors(contributorList);
  };

  const handleDeleteContributor = (contributorId: number) => {
    var contributorList: Contributor[] = contributors;
    contributorList = contributorList.filter((c) => c.id != contributorId);
    contributorList.map((c, i) => {
      c.id = i;
    });
    updatePostContributors(contributorList);
  };

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contributors
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {contributors.map((c) => {
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
                {contributors.length == 1 ? null : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteContributor(c.id)}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
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
