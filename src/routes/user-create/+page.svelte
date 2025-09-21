<script lang="ts">
	import { goto } from "$app/navigation";
	import UserInfoRow from "$lib/components/UserInfoRow.svelte";

    let user = $state({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    function validate() {
        if (!user.name || user.name === '') {
            alert('名前を入力してください。');
            return false;
        }
        if (!user.email || user.email === '') {
            alert('Emailを入力してください。');
            return false;
        }
        if (!user.phone || user.phone === '') {
            alert('電話番号を入力してください。');
            return false;
        }
        if (!user.address || user.address === '') {
            alert('住所を入力してください。');
            return false;
        }
        return true;
    }

    async function onclick() {
        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
					'Content-Type': 'application/json'
				},
                body: JSON.stringify({
                    ...user,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('登録に失敗しました。');
            }

            alert('登録しました。');
            goto('/user-search');
        } catch (error) {
            alert('エラーが発生しました。');
        }
    }
</script>

<div class="user-create-container">
    <h2>新規ユーザー登録</h2>

    <div class="user-create-table">
        <UserInfoRow columnName="名前">
            <input bind:value={user.name} type="text" />
        </UserInfoRow>
        <UserInfoRow columnName="Email">
            <input bind:value={user.email} type="email" />
        </UserInfoRow>
        <UserInfoRow columnName="電話番号">
            <input bind:value={user.phone} type="text" />
        </UserInfoRow>
        <UserInfoRow columnName="住所">
            <input bind:value={user.address} type="text" />
        </UserInfoRow>
    </div>

    <button class="user-create-button" onclick={() => {
        validate() ? onclick() : null
    }}>登録</button>
</div>

<style>
    .user-create-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
    }

    .user-create-table {
        width: 700px;
    }

    .user-create-button {
        text-align: center;
        align-items: center;
        width: 5%;
    }

    input {
        width: 95%;
        align-items: center;
    }
</style>
