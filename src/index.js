import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './redux/memberSlice';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlice';
import picsReducer from './redux/picsSlice';

const store = configureStore({
	reducer: {
		member: memberReducer,
		youtube: youtubeReducer,
		flickr: flickrReducer,
		pics: picsReducer,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
