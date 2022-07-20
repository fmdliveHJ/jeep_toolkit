import Layout from '../layouts/Layout';

import { useState, useRef } from 'react';
import Popup from '../components/Popup';
import { useSelector, useDispatch } from 'react-redux';
import MediaSlider from '../components/MediaSlider';

function Media() {
	const path = process.env.PUBLIC_URL;
	const pop = useRef(null);
	const Vids = useSelector((store) => store.youtube.data);

	const [Index, setIndex] = useState(0);

	const handlePopup = (index) => {
		pop.current.open();
		setIndex(index);
	};

	return (
		<>
			<Layout name={'Media'}>
				<div className='inner'>
					<h2>MEDIA</h2>
					<div className='story'>
						<h3>Story </h3>
						<div className='left'>
							<p>JEEP BRAND MAGAZINE </p>
							<MediaSlider />
							<span>계절의 시작과 함께 찾아오는 JEEP STORY를 만나보세요 </span>
						</div>
						<div className='right'>
							<video
								muted
								autoPlay
								loop
								controls
								src={`${path}/img/media/story.mp4`}></video>
						</div>
					</div>

					<div className='youtube_box'>
						<h3>YOUTUBE</h3>
						<div>
							{Vids.map((vid, idx) => {
								const tit = vid.snippet.title;
								const desc = vid.snippet.description;
								const date = vid.snippet.publishedAt;

								return (
									<article key={idx}>
										<div className='pic' onClick={() => handlePopup(idx)}>
											<img
												src={vid.snippet.thumbnails.standard.url}
												alt={vid.title}
											/>
										</div>
										<div className='text_box'>
											<h3>
												{tit.length > 30 ? tit.substr(0, 30) + '...' : tit}
											</h3>

											<p>
												{desc.length > 100 ? desc.substr(0, 100) + '...' : desc}
											</p>
										</div>
									</article>
								);
							})}
						</div>
					</div>

					<div className='magazine'>
						<h3>JEEP BRAND MAGAZINE </h3>
						<div className='top_box'>
							<div className='pic con1'>
								<img src={`${path}/img/media/magazine01.jpg`} alt='' />
							</div>
							<div className='pic con2'>
								<img src={`${path}/img/media/magazine02.jpg`} alt='' />
							</div>
							<div className='pic con3'>
								<img src={`${path}/img/media/magazine03.jpg`} alt='' />
							</div>
						</div>
						<div className='bottom_box'>
							<div className='pic con1'>
								<h3>SEE OUR JEEP STORIES</h3>
							</div>
							<div className='pic con2'>
								<img src={`${path}/img/media/magazine05.jpg`} alt='' />
							</div>
							<div className='pic con3'>
								<img src={`${path}/img/media/magazine06.jpg`} alt='' />
							</div>
						</div>
					</div>
				</div>
			</Layout>

			<Popup ref={pop}>
				{Vids.length !== 0 && (
					<iframe
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
						frameBorder='0'></iframe>
				)}
			</Popup>
		</>
	);
}

export default Media;
