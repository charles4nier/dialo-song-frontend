import { getData } from '../../../../services/api';

import { redirect } from 'next/navigation'

import PlayListTemplate from '../../../templates/playlist';

export default async function Playlist({ params }) {
    const { slug } = params,
    // endpointParams = `filters[slug][$eq]=${slug}&populate[tags]=*&populate[playlist][populate][music][populate]=*&populate[background_fx]=*`,
    // endpoint = `/playlists?${endpointParams}`,
    // data = await getData(endpoint);
    data = await getData(`/custom-playlists?slug=${slug}`);

    if (!data || !Object.keys(data).length) {
        redirect('/fr')
    }
        console.log('data', data)
	return (
        <PlayListTemplate data={data}/>
	)
}
