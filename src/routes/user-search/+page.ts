import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type UserSummary = {
    id: number,
    name: string,
};

export const load: PageLoad = async ({url, fetch}) => {
    const usersEndPoint = '/users';
    const searchUserId = url.searchParams.get('id') || ''
    const searchUserName = url.searchParams.get('_name_like') || ''
    const sortKey = url.searchParams.get('_sort') || 'id'
    const sortOrder = url.searchParams.get('_order') || 'ASC'
    const currentPage = url.searchParams.get('_page') || '1'
    const limit = url.searchParams.get('_limit') || '5'
    
    const queryParams = new URLSearchParams();
    if(searchUserId) queryParams.append('id', searchUserId);
    if(searchUserName) queryParams.append('_name_like', searchUserName);
    if(sortKey) queryParams.append('_sort', sortKey);
    if(sortOrder) queryParams.append('_order', sortOrder);
    if(currentPage) queryParams.append('_page', currentPage);
    if(limit) queryParams.append('_limit', limit);

    try {
        const response = await fetch(usersEndPoint+'?'+queryParams.toString());

        if(!response.ok) {
            throw error(response.status, 'ユーザーの取得に失敗しました。');
        }

        const totalCount = Number(response.headers.get('X-Total-Count') || '0');
        const userSummaries: UserSummary[] = await response.json();

        return {
            totalCount: totalCount,
            userSummaries: userSummaries,
            searchUserId: searchUserId,
            searchUserName: searchUserName,
            sortKey: sortKey,
            sortOrder: sortOrder,
            currentPage: currentPage,
            limit: limit
        };
    } catch(e) {
		if (e instanceof Error && e.message.includes('fetch failed')) {
			throw error(503, 'APIサーバーへの接続に失敗しました。');
		}
		throw e;
    }
}

