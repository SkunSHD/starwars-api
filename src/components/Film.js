import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: "100%",
    marginBottom: 20,
    textAlign: "center",
    background: "#f3f3f3"
  },
  media: {
    height: 250,
    width: 250,
    margin: "auto"
  },
});

export default function Film(props) {
  const classes = useStyles();
  const {title, director, episode_id, release_date, opening_crawl} = props.film

  return (
    <Grid item>
      <Card className={classes.root} onClick={props.handleClickOpen}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" component="p">
              Director: {director}<br />
            Episode: {episode_id}<br />
            Release date: {release_date}<br />
            </Typography><br />
            <Typography variant="body2" color="textSecondary" component="p">
              {opening_crawl}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}