import { Box, Grid, Typography, Divider } from "@mui/material";

function Comments({ user_name, response, created_at }) {
  let date = new Date(created_at);
  let year = date.toISOString().substring(0, 10);
  let time = date.toISOString().substring(11, 16);

  return (
    <Box p={2}>
      <Grid container spacing={1}>
        <Grid item>
          <Typography component="p" variant="body1" sx={{ fontWeight: "bold" }}>
            {user_name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            component="p"
            variant="body1"
            sx={{ color: "text.secondary" }}
          >
            {year} {time}
          </Typography>
        </Grid>
      </Grid>
      <Grid container pt={1}>
        <Grid item>
          <Typography component="p" variant="body1">
            {response}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, width: "100%" }} />
    </Box>
  );
}

export default Comments;
