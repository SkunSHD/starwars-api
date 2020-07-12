import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardFilm from './CardFilm';
import Grid from "@material-ui/core/Grid";
import CardCharacters from './CardCharacters';
import CardPlanets from './CardPlanets';
import CardSpecies from './CardSpecies';
import CardStarships from './CardStarships';
import CardVehicles from './CardVehicles';

const components = {
  vehicles: CardVehicles,
  characters: CardCharacters,
  history: CardStarships,
  planets: CardPlanets,
  species: CardSpecies,
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  grid_item: {
    margin: 10
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilmDetailsDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item className={classes.grid_item}>
      <CardFilm handleClickOpen={handleClickOpen} film={props.film}/>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Details
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          {Object.keys(props.film).map(categoryName => {
            const SpecificComponent = components[categoryName];
            const links = props.film[categoryName];
            if (!SpecificComponent || !Array.isArray(links)) return null;
            return (
              <ListItem key={categoryName}>
                <Grid container>
                  <Grid 
                    item
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                  >
                    <h3>{categoryName}</h3>
                    {links.map(link => {
                      return (
                        <SpecificComponent key={link} link={link} />
                      )
                    })}
                  </Grid>
                </Grid>
              </ListItem>
            )
          })}
        </List>
      </Dialog>
    </Grid>
  );
}
