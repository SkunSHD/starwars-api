import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getData } from '../utils';

const useStyles = makeStyles({
  root: {
    width: 200,
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

export default function Starships({ link, handleClickOpen }) {
  const classes = useStyles();
  const [starship, setStarship] = useState({});
  useEffect(() => getData(link, setStarship), []);

  return (
    <Grid item>
      <Card className={classes.root} onClick={handleClickOpen}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {starship.name}
            </Typography>
            <Typography variant="body2" component="p">
              Starship class: {starship.starship_class}<br/>
              Manufacturer: {starship.manufacturer}<br/>
              Model: {starship.model}<br/>
            </Typography><br/>
            <Typography variant="body2" color="textSecondary" component="p">
              Length: {starship.length}<br/>
              Hyperdrive rating: {starship.hyperdrive_rating}<br/>
              Max atmosphering speed: {starship.max_atmosphering_speed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}