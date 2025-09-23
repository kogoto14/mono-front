<script lang="ts">
	import UserInfoRow from "$lib/components/UserInfoRow.svelte";
    
    let { form }: { form?: any } = $props();

    let user = $state({
        name: form?.values?.name ?? '',
        email: form?.values?.email ?? '',
        phone: form?.values?.phone ?? '',
        address: form?.values?.address ?? '',
    });
</script>

<div class="user-create-container">
    <h2>新規ユーザー登録</h2>

    <form method="POST" class="user-create-form">
        <div class="user-create-table">
            <UserInfoRow columnName="名前">
                <input name="name" bind:value={user.name} type="text" required maxlength="255"/>
                {#if form?.errors?.name}<p class="error-message">{form.errors.name}</p>{/if}
            </UserInfoRow>
            <UserInfoRow columnName="Email">
                <input name="email" bind:value={user.email} type="email" required/>
                {#if form?.errors?.email}<p class="error-message">{form.errors.email}</p>{/if}
            </UserInfoRow>
            <UserInfoRow columnName="電話番号(数字のみ)">
                <input name="phone" bind:value={user.phone} type="tel" required pattern="^[0-9]+$"/>
                {#if form?.errors?.phone}<p class="error-message">{form.errors.phone}</p>{/if}
            </UserInfoRow>
            <UserInfoRow columnName="住所">
                <input name="address" bind:value={user.address} type="text" required maxlength="255"/>
                {#if form?.errors?.address}<p class="error-message">{form.errors.address}</p>{/if}
            </UserInfoRow>
        </div>
        <button type="submit" class="user-create-button">登録</button>
    </form>    
</div>

<style>
    .user-create-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .user-create-table {
        display: flex;
        flex-direction: column;
        width: 800px;
    }
    .user-create-button {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        width: 15%;
        margin: 20px auto 0;
        background-color: #4caf50;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .error-message {
        color: red;
        font-size: 12px;
        margin-top: 5px;
    }
    input {
        display: flex;
        flex-direction: column;
        width: 98%;
        align-items: center;
    }
</style>
