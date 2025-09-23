import { userSchema } from '$lib/validation/user';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const values = {
            name: String(formData.get('name') ?? ''),
            email: String(formData.get('email') ?? ''),
            phone: String(formData.get('phone') ?? ''),
            address: String(formData.get('address') ?? '')
        };

        const parsed = userSchema.safeParse(values);
        if(!parsed.success) {
            return fail(400, { errors: parsed.error.flatten().fieldErrors, values: values });
        }

        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if(!response.ok) {
            return fail(response.status, { errors: { default: '登録に失敗しました。' }, values: values });
        }

        throw redirect(302, '/user-search');
    } 
}
