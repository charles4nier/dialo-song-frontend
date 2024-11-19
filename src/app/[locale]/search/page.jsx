import { getData } from '../../../services/api';

import SearchTemplate from '../../templates/search';

export default async function Search() {
	const data = await getData('/game-tags/all');

	return (
		<SearchTemplate gameTags={data} />
	)
}
