<script lang="ts">
	import type { PageData } from './$types';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import EditableField from '$lib/components/EditableField.svelte';
	import UserInfoRow from '$lib/components/UserInfoRow.svelte';

	let { data }: { data: PageData } = $props();

	let editableUser = $state({ ...data.userDetail });

	let editing = $state({
		name: false,
		email: false,
		phone: false,
		address: false
	});

	async function handleUpdate() {
		try {
			const response = await fetch(`/users/${editableUser.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: editableUser.name,
					email: editableUser.email,
					phone: editableUser.phone,
					address: editableUser.address,
					updatedAt: new Date().toISOString()
				})
			});

			if (!response.ok) {
				throw new Error('更新に失敗しました。');
			}

			// 更新が成功したら、すべての編集モードを解除
			editing.name = false;
			editing.email = false;
			editing.phone = false;
			editing.address = false;

			alert('更新しました。');
			goto('/user-search');
		} catch (error) {
			console.error(error);
			alert('エラーが発生しました。');
		}
	}

	async function handleDelete() {
		try {
			const response = await fetch(`/users/${editableUser.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('削除に失敗しました。');
			}

			alert('削除しました。');
			goto('/user-search');
		} catch (error) {
			console.error(error);
			alert('エラーが発生しました。');
		}
	}
</script>

<div class="user-detail-container">
	<h2>ユーザー詳細</h2>

	{#if $navigating}
		<p>Loading...</p>
	{:else}
		<div class="user-detail-table">
			<UserInfoRow columnName="ID">
				{editableUser.id}
			</UserInfoRow>
			<UserInfoRow columnName="名前">
				<EditableField bind:value={editableUser.name} bind:isEditing={editing.name} type="text" />
			</UserInfoRow>
			<UserInfoRow columnName="Email">
				<EditableField
					bind:value={editableUser.email}
					bind:isEditing={editing.email}
					type="email"
				/>
			</UserInfoRow>
			<UserInfoRow columnName="電話番号">
				<EditableField bind:value={editableUser.phone} bind:isEditing={editing.phone} type="text" />
			</UserInfoRow>
			<UserInfoRow columnName="住所">
				<EditableField
					bind:value={editableUser.address}
					bind:isEditing={editing.address}
					type="text"
				/>
			</UserInfoRow>
			<UserInfoRow columnName="作成日時">
				{editableUser.createdAt}
			</UserInfoRow>
			<UserInfoRow columnName="最終更新日時">
				{editableUser.updatedAt}
			</UserInfoRow>
		</div>

		<div class="user-detail-button">
			<button type="submit" on:click={handleUpdate}>更新</button>
			<button type="button" on:click={handleDelete}>削除</button>
		</div>
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
	}

	.user-detail-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
</style>
