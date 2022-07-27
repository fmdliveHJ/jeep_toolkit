import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPics = createAsyncThunk('pics/requestPics', async () => {
	const url = `${process.env.PUBLIC_URL}/DB/pics.json`;
	const response = await axios.get(url);
	return response.data.pics;
});

const picsSlice = createSlice({
	name: 'pics',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchPics.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchPics.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchPics.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default picsSlice.reducer;
