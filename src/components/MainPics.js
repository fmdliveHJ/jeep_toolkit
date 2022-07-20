import { useSelector } from 'react-redux';
import { useRef } from 'react';

function MainPics({ Scrolled, start, base }) {
	const path = process.env.PUBLIC_URL;
	const imgs = useSelector((store) => store.flickr.data);

	const video = useRef(null);

	const onMouseEnter = (e) => {
		const vid = e.currentTarget.querySelector('video');

		vid.play();
	};
	const onMouseLeave = (e) => {
		const vid = e.currentTarget.querySelector('video');
		vid.pause();
	};

	return (
		<>
			<section id='pic' className='myScroll'>
				<h2>Pics</h2>
				<div className='box'>
					{imgs.map((item, idx) => {
						if (idx < 8) {
							return (
								<div
									className='pic'
									key={idx}
									onMouseEnter={onMouseEnter}
									onMouseLeave={onMouseLeave}>
									<h3>{item.title}</h3>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
										alt={item.title}
									/>
									<video
										muted
										loop
										src={`${path}/img/${item.video}`}
										className='video'></video>
								</div>
							);
						}
					})}
				</div>
			</section>
		</>
	);
}

export default MainPics;
