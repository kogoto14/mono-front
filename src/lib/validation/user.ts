import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, { error:'名前を入力してください。'} ).max(255, { error:'名前は255文字以内で入力してください。'}),
    email: z.string().email({ error:'有効なEmailを入力してください。'}),
    phone: z.string().min(1, { error:'電話番号を入力してください。'}).regex(/^\d{10,11}$/, { error:'電話番号は10~11桁の数字のみで入力してください。'}),
    address: z.string().min(1, { error:'住所を入力してください。'}).max(255, { error:'住所は255文字以内で入力してください。'})
});
