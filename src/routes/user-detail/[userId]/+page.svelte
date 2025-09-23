<script lang="ts">
	import EditableField from '$lib/components/EditableField.svelte';
	import UserInfoRow from '$lib/components/UserInfoRow.svelte';
	import { navigating } from '$app/stores';
	import type { PageData } from './$types';

	let { data, form }: { data: PageData; form?: any } = $props();

	let editableUser = $state({ ...data.userDetail });

	let editing = $state({　name: false,　email: false,　phone: false,　address: false　});
</script>

<div class="user-detail-container">
	<h2>ユーザー詳細</h2>

	{#if $navigating}
		<p>Loading...</p>
	{:else}
		<form method="POST" action="?/update" class="user-detail-table">
			<div class="user-detail-table">
				<UserInfoRow columnName="ID">{editableUser.id}</UserInfoRow>

				<UserInfoRow columnName="名前">
					<EditableField bind:value={editableUser.name} bind:isEditing={editing.name} type="text" />
					<input type="hidden" name="name" value={editableUser.name} />
					{#if form?.errors?.name}<p class="error-message">{form.errors.name}</p>{/if}
				</UserInfoRow>
				
				<UserInfoRow columnName="Email">
					<EditableField bind:value={editableUser.email} bind:isEditing={editing.email} type="email" />
					<input type="hidden" name="email" value={editableUser.email} />
					{#if form?.errors?.email}<p class="error-message">{form.errors.email}</p>{/if}
				</UserInfoRow>
				
				<UserInfoRow columnName="電話番号">
					<EditableField bind:value={editableUser.phone} bind:isEditing={editing.phone} type="text" />
					<input type="hidden" name="phone" value={editableUser.phone} />
					{#if form?.errors?.phone}<p class="error-message">{form.errors.phone}</p>{/if}
				</UserInfoRow>
				
				<UserInfoRow columnName="住所">
					<EditableField bind:value={editableUser.address} bind:isEditing={editing.address} type="text" />
					<input type="hidden" name="address" value={editableUser.address} />
					{#if form?.errors?.address}<p class="error-message">{form.errors.address}</p>{/if}
				</UserInfoRow>
				
				<UserInfoRow columnName="作成日時">{editableUser.createdAt}</UserInfoRow>
				<UserInfoRow columnName="最終更新日時">{editableUser.updatedAt}</UserInfoRow>
			</div>
			<button type="submit" class="user-update-button">更新</button>
		</form>

		<form method="POST" action="?/delete" onsubmit={(e) => {if(!confirm('削除しますか？')) e.preventDefault(); }}>
			<button type="submit" class="user-delete-button">削除</button>
		</form>
	{/if}
</div>

<style>
	.user-detail-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		width: 100%;
	}
	.user-detail-table {
		width: 700px;
		word-break: break-all;
	}
	.user-update-button {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
        width: 100px;
        margin: 20px auto 0;
        background-color: #4caf50;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
	}
	.user-delete-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100px;
        margin: auto 0;
        background-color: #f44336;
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
</style>
