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

export default function CardVehicles(props) {
  const classes = useStyles();
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    const getData = () => {
      fetch(props.link)
        .then(response => response.json())
        .then(info => setVehicle(info))
    };
    getData();
  }, []);

  return (
    <Grid item className={classes.grid_item}>
      <Card className={classes.root} onClick={props.handleClickOpen}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {vehicle.name}
            </Typography>
            <Typography variant="body2" component="p">
              Model: {vehicle.model}<br/>
              Manufacturer: {vehicle.manufacturer}<br/>
              Vehicle class: {vehicle.vehicle_class}<br/>
            </Typography><br/>
            <Typography variant="body2" color="textSecondary" component="p">
              Cost in credits: {vehicle.cost_in_credits}<br/>
              Max atmosphering speed: {vehicle.max_atmosphering_speed}
              Length: {vehicle.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}