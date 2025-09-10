import CookieService from '@/services/CookieService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
  loading: false, // ** pending 
  data: null, // ** succes => fulfilled
  error: null, // * Error => rejected
}




export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local`,
        userData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);


const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        const data = new Date();
        const IN_DAYS = 3 ;
        const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
        data.setTime(data.getTime() + EXPIRES_IN_DAYS); // Set cookie to expire in 1 hour
        const options = {path: '/', expires: data}
        CookieService.set("jwt", action.payload.jwt, options);
        window.location.reload();
        // setTimeout(() => {
        //   // CookieService.remove("jwt");
        // }, 3000);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectLogin = ({ login }) => login;

export default loginSlice.reducer