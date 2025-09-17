import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


type UserSummary = {
    id: number,
    name: string,
};

export const load: PageLoad = async ({url, fetch}) => {
    const usersEndPoint = 'http://localhost:3000/users';
    const searchUserId = url.searchParams.get('id') || ''
    const searchUserName = url.searchParams.get('name') || ''

    try {
        const params = new URLSearchParams();
        if(searchUserId) params.append('id', searchUserId);
        if(searchUserName) params.append('name', searchUserName);

        const url = `${usersEndPoint}?${params.toString()}`;
        const response = await fetch(url);

        if(!response.ok) {
            throw error(response.status, 'ユーザーの取得に失敗しました。');
        }

        const users: UserSummary[] = await response.json();
        return {
            users,
            searchUserId,
            searchUserName
        };
    } catch(e) {
		if (e instanceof Error && e.message.includes('fetch failed')) {
			throw error(503, 'APIサーバーへの接続に失敗しました。');
		}
		throw e;
    }
}
