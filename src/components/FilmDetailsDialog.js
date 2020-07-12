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
import CardFilm from './Film';
import Grid from "@material-ui/core/Grid";
import Characters from './Characters';
import Planets from './Planets';
import Species from './Species';
import Starships from './Starships';
import Vehicles from './Vehicles';
import { capitalizeFirstLetter } from '../utils';

const components = {
  vehicles: Vehicles,
  characters: Characters,
  history: Starships,
  planets: Planets,
  species: Species,
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
                <Grid 
                  item 
                  container
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>{capitalizeFirstLetter(categoryName)}</Typography>
                    <Divider />
                    </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justify="center"
                    spacing={2}
                  >
                    {links.map(link => <SpecificComponent key={link} link={link} />)}
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
