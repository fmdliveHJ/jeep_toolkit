import { Route, Switch } from 'react-router-dom';
import '../scss/style.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

//sub
import Jeeplife from '../pages/Jeeplife';
import Gallery from '../pages/Gallery';
import Media from '../pages/Media';
import Main from '../pages/Main';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMember } from '../redux/memberSlice';
import { fetchYoutube } from '../redux/youtubeSlice';
import { fetchFlickr } from '../redux/flickrSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMember());
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'user', count: 8, user: '195814985@N05' }));
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Main />
				</Route>

				{/* 서브용 header */}
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>
			<Route path='/jeeplife' component={Jeeplife} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/media' component={Media} />
			<Footer />
		</>
	);
}

export default App;
