import { CircularProgress, Grid } from "@material-ui/core";

const LoadingScreen = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <CircularProgress data-testid="spinner" />
      </Grid>
    </Grid>
  );
};

export default LoadingScreen;
