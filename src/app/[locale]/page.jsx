import './style.scss';
import React from 'react';
import { getData } from '../../services/api';
// Components
import SvgClock from '../components/svg/svgClock'
import SvgHeadPhone from '../components/svg/svgHeadPhone'
import { redirect } from 'next/navigation'

const BASE_CASSNAME = 'loopsie-home';

export default async function Page() {
	redirect('/fr/search');
	const data = await getData('/home');

	return (
		<div className={BASE_CASSNAME}>
			<div className={`${BASE_CASSNAME}__announcement`}>
				<div>
					<p> ANNONCE</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
				<img src="/loup-garou.jpg" alt="game picture"/>
			</div>
			<div className={`${BASE_CASSNAME}__theme`}>
				<h2>Ecoutez récemment</h2>
				<ul className={`${BASE_CASSNAME}__game-list`}>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}>
							<img src="/7-wonders.jpg" alt="game picture"/>
							<SvgHeadPhone/>
						</div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
						
					</li>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}><img src="/7-wonders.jpg" alt="game picture"/><SvgHeadPhone/></div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
						
					</li>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}><img src="/7-wonders.jpg" alt="game picture"/><SvgHeadPhone/></div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
						
					</li>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}><img src="/7-wonders.jpg" alt="game picture"/><SvgHeadPhone/></div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
					</li>
				</ul>
			</div>
			<div className={`${BASE_CASSNAME}__theme`}>
				<h2>Ecoutez récemment</h2>
				<ul className={`${BASE_CASSNAME}__game-list`}>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}>
							<img src="/7-wonders.jpg" alt="game picture"/>
							<SvgHeadPhone/>
						</div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
						
					</li>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}><img src="/7-wonders.jpg" alt="game picture"/><SvgHeadPhone/></div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
						
					</li>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}><img src="/7-wonders.jpg" alt="game picture"/><SvgHeadPhone/></div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
						
					</li>
					<li className={`${BASE_CASSNAME}__game-card`}>
						<div className={`${BASE_CASSNAME}__game-picture`}><img src="/7-wonders.jpg" alt="game picture"/><SvgHeadPhone/></div>
						<div>
							<p className={`${BASE_CASSNAME}__game-title`}>7 Wonders</p>
							<p className={`${BASE_CASSNAME}__game-duration`}><SvgClock/> 30min</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}
