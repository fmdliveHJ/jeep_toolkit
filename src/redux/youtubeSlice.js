import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
/**
 * import axios를 불러줌
 * createSlice createAsyncThunk를 툴킷에서 불러옴
 */

//axios 호출 함수 정의 및 export
//슬라이스 파일 안에서 axios를 비동기 처리해서 내보내 주는 함수 
//createAsyncThunk 안에는 인수값이 2개가 받아짐 
export const fetchYoutube = createAsyncThunk(
	// 명칭은 아무거나 상관 없음 
	'youtube/requestYoutube',
	async () => {
		const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
		const playlist = 'PLooTX0MOEe6OAucsxOqZTV72g8pieLz9z';
		const num = 9;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
		//url로 요청을 보내야하니까 axios 호출함
		//순수한 형태로 내보내야하기때문에 then을 쓰지 않음 
		//response 변수에 axios 결과값을 받음
		const response = await axios.get(url);
		//리스폰스 데이터값을 안에서 내보내줌 
		return response.data.items;
	}
);

//비동기 데이터를 변형하거나 store에 전달해줄 리듀서를 만들어야함 
//리듀서를 생성해주는 함수 
const youtubeSlice = createSlice({
	name: 'youtube',
	//리듀서 스테이트 값에 초기값 저장 키값 , 밸류값 저장  데이터 키값에 여러가지 키값이니까 배열로 저장
	initialState: {
		data: [],
		isLoading: false,
	},
	//createAsyncThunk의 데이터 상태에 따라서 
	//객체에 어떤 변수값을 []넣으면 변수를 키값으로 활용할 수 있음 
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default youtubeSlice.reducer;
