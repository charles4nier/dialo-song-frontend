import { getData } from '../../../services/api';
import { getLocalApi } from '../../../services/local-api';
import fs from 'fs';
import path from 'path';

import SearchTemplate from '../../templates/search';

export default async function Search() {
	  // Chemin vers le fichier JSON local
	  const filePath = path.join(process.cwd(), 'public', 'emulate-datas', 'game-tags', 'index.json');

	  // Lire et parser le fichier JSON
	  const fileContents = fs.readFileSync(filePath, 'utf-8');
	  const data = JSON.parse(fileContents);
	return (
		<SearchTemplate gameTags={data} />
	)
}
