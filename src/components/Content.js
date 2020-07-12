import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import ProgressCentered from './ProgressCentered';
import Grid from '@material-ui/core/Grid';
import FilmDetailsDialog from './FilmDetailsDialog';
import IconButton from '@material-ui/core/IconButton';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

class Content extends React.Component {
  state = {
    search: [],
    films: [],
    error: '',
    isDescending: true,
  };

  componentDidMount() {
    this.fetchFilms();
  }

  get filmsSorted() {
    return this.state.films.sort(this.state.isDescending ? this.descendingSort : this.ascendingSort);
  }

  get searchSorted() {
    return this.state.search.sort(this.state.isDescending ? this.descendingSort : this.ascendingSort);
  }

  get isSearchActive() {
    return this.state.search.length !== 0;
  }

  fetchFilms = () => {    
    fetch("https://swapi.dev/api/films")
      .then(response => response.json())
      .then(res => this.setState({
          films: res.results
      }))
      .catch(error => this.setState({
        error
      }));
  };

  handleSearchFilm = (event) => {
    if (!event.target.value) {
      this.setState({
        search: [],
        error: '',
      });
      return;
    };

    const filmsFiltered = this.state.films.filter(film => film.title.includes(event.target.value));
    
    let newState;
    if (filmsFiltered.length) {
      newState = {
        error: '',
        search: filmsFiltered,
      };
    } else {
      newState = {
        error: 'Film not found',
        search: [],
      };
    }
    this.setState(newState);
  };

  ascendingSort = (prev, next) => {
    if (prev.title < next.title) return -1;
    if (prev.title > next.title) return 1;
  };

  descendingSort = (prev, next) => {
    if (prev.title > next.title) return -1;
    if (prev.title < next.title) return 1;
  };

  handleSortFilms = () => {
    this.setState({
      isDescending: !this.state.isDescending,
    });
  };

  render() {
    const { classes } = this.props;

    if(this.state.films.length === 0) {
      return <ProgressCentered />
    }

    return (
      <div className={classes.searchFild}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
          onChange={this.handleSearchFilm}
        />
        <IconButton onClick={this.handleSortFilms}>
          <SortByAlphaIcon />
        </IconButton>
        {!!this.state.error && (
          <p>
            <span className={classes.error}>{this.state.error}</span><br />
            <br />
            <img
              src="https://media.blenderartists.org/uploads/default/optimized/4X/e/2/b/e2b4aef13ea6e6a6c1fe41990068d782544f9548_2_690x388.jpeg"
              alt="error"
              className={classes.error_img}
            />
          </p>
        )}
        <div className={classes.content}>
          <Grid
            container
            justify="center"
            alignItems="stretch"
            spacing={2}
          >
            {!this.state.error && (
              this.isSearchActive ? this.searchSorted : this.filmsSorted).map(film => (
                <FilmDetailsDialog key={film.title} film={film} />
              )
            )}
          </Grid>
        </div>
      </div>
    )
  }
}

const useStylesForm = withStyles((theme) => ({
  searchFild: {
    textAlign: "center",
    marginTop: "25px",
  },
  error: {
    color: "#ff0000",
  },
  error_img: {
    borderRadius: "15px",
    width: "400px",
  },
  content: {
    marginTop: 25,
  }
}))(Content);

export default useStylesForm;
