import { getData } from '../../../../services/api';

import { redirect } from 'next/navigation'

import fs from 'fs';
import path from 'path';

import PlayListTemplate from '../../../templates/playlist';

export default async function Playlist({ params }) {
    const { slug } = params,
    // endpointParams = `filters[slug][$eq]=${slug}&populate[tags]=*&populate[playlist][populate][music][populate]=*&populate[background_fx]=*`,
    // endpoint = `/playlists?${endpointParams}`,
    // data = await getData(endpoint);
    //data = await getData(`/custom-playlists?slug=${slug}`);
    filePath = path.join(process.cwd(), 'public', 'emulate-datas', 'playlists', slug, 'index.json'),

    // Lire et parser le fichier JSON
    fileContents = fs.readFileSync(filePath, 'utf-8'),
    data = JSON.parse(fileContents);
    data.basePlayListUrl = `/emulate-datas/playlists/${slug}/playlist/0`,
    data.coverUrl =  `/emulate-datas/playlists/${slug}/cover.png`;

    if (!data || !Object.keys(data).length) {
        redirect('/fr')
    }

    return (<PlayListTemplate data={{...data}}/>)
}
