import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAysncMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAysncShows",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAysncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  loader: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
        state.loader = true;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        console.log("Fetched Successfully!");
        state.loader = false;
        state.movies = action.payload;
        // return { ...state, movies: action.payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        state.loader = false;
        console.log("Rejected!");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        console.log("Fetched Successfully!");
        state.shows = action.payload;
        // return { ...state, shows: action.payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        console.log("Fetched Successfully!");
        state.selectMovieOrShow = action.payload;
        // return { ...state, selectMovieOrShow: action.payload };
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const isLoading = (state) => state.movies.loader;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
