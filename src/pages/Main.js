import Header from '../components//Header';

import MainVisual from '../components/MainVisual';
import MainVids from '../components/MainVids';
import Btns from '../components/Btns';
import MainHistory from '../components/MainHistory';
import MainPics from '../components/MainPics';
import Anime from '../asset/anim.js';
import { useRef, useEffect, useState } from 'react';

function Main() {
	const main = useRef(null);
	//브라우저가 리사이즈 되고 각 섹션요소의 높이값이 바뀔때마다 main컴포넌트를 재실행하지 않기 위해서
	//각 세로 위치값을 state가 아닌 useRef로 생성한 참조객체에 저장
	//useRef로 생성한 객체에 저장된 값은 컴포넌트가 재실행되더라도 값이 유지됨
	//useRef에 담겨있는 값이 변경되더라도 컴포넌트가 재실행되지 않음
	const pos = useRef([]);
	const [Index, setIndex] = useState(0);
	//현재 스크롤되는 값을 관리할 state추가
	const [Scrolled, setScrolled] = useState(0);
	let secs = null;
	const base = -300;

	const getPos = () => {
		pos.current = [];
		secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
	};

	const activation = () => {
		const scroll = window.scrollY;
		const btns = main.current.querySelectorAll('.scroll_navi li');
		//현재 스크롤되는 거리값을 scrolled state에 저장해서 관리
		setScrolled(scroll);

		pos.current.map((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const sec of secs) sec.classList.remove('on');
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();

		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	useEffect(() => {
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[Index],
			duration: 500,
		});
	}, [Index]);

	return (
		<>
			<main ref={main}>
				<Header type={'main'} />
				<MainVisual />
				<MainHistory />
				<MainPics Scrolled={Scrolled} start={pos.current[2]} base={base} />
				<MainVids />
				<Btns setIndex={setIndex} />
			</main>
		</>
	);
}

export default Main;
