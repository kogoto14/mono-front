import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { UserDetail } from '$lib/types/types';
import { userSchema } from '$lib/validation/user';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const response = await fetch(`/users/${params.userId}`);
        if(!response.ok) throw error(response.status, 'ユーザーの取得に失敗しました。');
        const data: UserDetail = await response.json();
        if(!data) throw error(500, 'ユーザーが見つかりません。');
        return { userDetail: data };
};

export const actions: Actions = {
    update: async ({ request, params, fetch }) => {
        const formData = await request.formData();
        const values = {
            name: String(formData.get('name') ?? ''),
            email: String(formData.get('email') ?? ''),
            phone: String(formData.get('phone') ?? ''),
            address: String(formData.get('address') ?? '')
        };

        const parsed = userSchema.safeParse(values);
        if(!parsed.success) return fail(400, { errors: parsed.error.flatten().fieldErrors, values: values });

        const response = await fetch(`/users/${params.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
        
        if(!response.ok) return fail(response.status, { errors: { default: '更新に失敗しました。' }, values: values });
        throw redirect(302, '/user-search');
    },
    delete: async ({ params, fetch }) => {
        const response = await fetch(`/users/${params.userId}`, { method: 'DELETE' });
        if(!response.ok) return fail(response.status, { errors: { default: '削除に失敗しました。' } });
        throw redirect(302, '/user-search');
    }
}
