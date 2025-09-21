import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type UserDetail = {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    createdAt: string,
    updatedAt: string
};

export const load: PageLoad = async ({ params, fetch }) => { 
    const userDetailEndPoint = '/users';

    try {
        const response = await fetch(`${userDetailEndPoint}/${params.userId}`);

        if(!response.ok) {
            throw error(response.status, 'ユーザーの取得に失敗しました。');
        }
    
        const data: UserDetail = await response.json();
    
        if(!data) {
            throw error(500, 'ユーザーが見つかりません。');
        }
    
        return {
            userDetail: data
        }
    } catch (e) {
		if (e instanceof Error && e.message.includes('fetch failed')) {
			throw error(503, 'APIサーバーへの接続に失敗しました。サーバーが起動しているか確認してください。');
		}
		throw e;
    }
};
