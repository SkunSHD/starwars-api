import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  grid_item: {
    margin: 10
  },
});

export default function CardPlanets(props) {
  const classes = useStyles();
  const [planet, setPlanet] = useState({});

  useEffect(() => {
    const getData = () => {
      fetch(props.link)
        .then(response => response.json())
        .then(info => setPlanet(info))
    };
    getData();  
  }, []);

  return (
    <Grid item className={classes.grid_item}>
      <Card className={classes.root} onClick={props.handleClickOpen}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {planet.name}
            </Typography>
            <Typography variant="body2" component="p">
              climate: {planet.climate}<br/>
              diameter: {planet.diameter}<br/>
              terrain: {planet.terrain}<br/>
              population: {planet.population}<br/>
            </Typography><br/>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}