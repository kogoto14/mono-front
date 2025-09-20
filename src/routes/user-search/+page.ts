import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type UserSummary = {
    id: number,
    name: string,
};

export const load: PageLoad = async ({url, fetch}) => {
    const usersEndPoint = 'http://localhost:3000/users';
    const searchUserId = url.searchParams.get('id') || ''
    const searchUserName = url.searchParams.get('_name_like') || ''
    
    try {
        const queryParams = buildSearchParams(url, searchUserId, searchUserName);
        const requestUrl = `${usersEndPoint}?${queryParams.toString()}`;
        const response = await fetch(requestUrl);

        if(!response.ok) {
            throw error(response.status, 'ユーザーの取得に失敗しました。');
        }

        const totalCount = Number(response.headers.get('X-Total-Count') || '0');
        const userSummaries: UserSummary[] = await response.json();

        return {
            totalCount: totalCount,
            userSummaries: userSummaries,
            searchUserId: searchUserId,
            searchUserName: searchUserName
        };
    } catch(e) {
		if (e instanceof Error && e.message.includes('fetch failed')) {
			throw error(503, 'APIサーバーへの接続に失敗しました。');
		}
		throw e;
    }
}

function buildSearchParams(url: URL, searchUserId: string, searchUserName: string) {
    const currentPage = url.searchParams.get('_page') || ''
    const limit = url.searchParams.get('_limit') || ''
    const sortKey = url.searchParams.get('_sort') || ''
    const sortOrder = url.searchParams.get('_order') || ''

    const params = new URLSearchParams();
    if(searchUserId) params.append('id', searchUserId);
    if(searchUserName) params.append('_name_like', searchUserName);
    if(currentPage) params.append('_page', currentPage);
    if(limit) params.append('_limit', limit);
    if(sortKey) params.append('_sort', sortKey);
    if(sortOrder) params.append('_order', sortOrder);

    return params;
}