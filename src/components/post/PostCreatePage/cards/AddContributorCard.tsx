import { Card, CardContent, Typography, Button, Avatar, Box, CardActions, TextField } from '@mui/material';
import * as React from 'react';

export default function AddContributorCard() {
  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Contributors
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: "column" }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "5px" }}>
          <Avatar sx={{ marginRight: "10px"}} alt="?" src="" />
          <TextField fullWidth label="Contributor 1" variant="standard" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "5px" }}>
          <Avatar sx={{ marginRight: "10px"}} alt="?" src="" />
          <TextField fullWidth label="Contributor 2" variant="standard" />
        </Box>
      </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Add contributor</Button>
      </CardActions>
    </Card>
  );
}