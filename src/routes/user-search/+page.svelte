<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// ユーザー検索
	let searchUserId = $state(data.searchUserId);
	let searchUserName = $state(data.searchUserName);
	// ソート
	let sortKey = $state(data.sortKey);
	let sortOrder = $state(data.sortOrder);
	// ユーザー一覧
	let totalUsers = $derived(data.totalCount);
	let paginatedusers = $derived(data.userSummaries);
	// ページネーション
	let limit = $state(Number(data.limit));
	let currentPage = $state(Number(data.currentPage));
	let totalPages = $derived(Math.ceil(totalUsers / limit));

	function searchUsersOnTargetPage(page: number) {
		currentPage = page;
		const params = buildSearchParams();
		goto(`?${params.toString()}`, { keepFocus: true, noScroll: true });
	}

	function buildSearchParams() {
		const params = new URLSearchParams();
		if (searchUserId) params.append('id', searchUserId);
		if (searchUserName) params.append('_name_like', searchUserName);
		if (sortKey) params.append('_sort', sortKey);
		if (sortOrder) params.append('_order', sortOrder);
		if (currentPage) params.append('_page', currentPage.toString());
		if (limit) params.append('_limit', limit.toString());

		return params;
	}
</script>

<div class="user-search-container">
	<h2>ユーザー検索</h2>

	<button class="user-create-button" onclick={() => goto('/user-create')}>新規登録</button>

	<!-- 検索フォーム -->
	<div class="search-form">
		<form
			method="GET"
			onsubmit={(e) => { e.preventDefault(); searchUsersOnTargetPage(1); }}
		>
			<h3>ユーザーID:</h3>
			<input type="text" bind:value={searchUserId} />
			<h3>ユーザー名:</h3>
			<input type="text" bind:value={searchUserName} />
			<button type="submit">検索</button>
		</form>
	</div>

	<!-- ソート -->
	<div class="sort-form">
		<select bind:value={sortKey} onchange={() => searchUsersOnTargetPage(1)}>
			<option value="id">ID</option>
			<option value="name">Name</option>
		</select>
		を
		<select bind:value={sortOrder} onchange={() => searchUsersOnTargetPage(1)}>
			<option value="ASC">昇順</option>
			<option value="DESC">降順</option>
		</select>
		で並び替え
	</div>

	<!-- 結果表示欄 -->
	{#if paginatedusers.length > 0}
		<div class="users-display">
			{#each paginatedusers as user}
				<div class="user-item">
					<p>ID: {user.id}</p>
					<p>名前: {user.name}</p>
					<a href="/user-detail/{user.id}">詳細</a>
				</div>
			{/each}
		</div>
	{:else}
		<p>ユーザーが見つかりません。</p>
	{/if}

	<!-- ページネーション -->
	<div class="pagination-container">
		<button
			onclick={() => searchUsersOnTargetPage(currentPage - 1)}
			disabled={currentPage === 1}
		>
			前へ
		</button>
		{#each Array.from({ length: totalPages }) as _, i}
			<button
				onclick={() => searchUsersOnTargetPage(i + 1)}
				disabled={currentPage === i + 1}>{i + 1}</button
			>
		{/each}
		<button
			onclick={() => searchUsersOnTargetPage(currentPage + 1)}
			disabled={currentPage === totalPages}
		>
			次へ
		</button>
		<p>{totalUsers} 件中 {(currentPage - 1) * limit + 1}-{Math.min(currentPage * limit, totalUsers)} 件を表示</p>
	</div>
</div>

<style>
	.user-search-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}
	.user-create-button {
		align-self: flex-end;
		margin-right: 25%;
		background-color: #4caf50;
		color: white;
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	.search-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-bottom: 20px;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #f0f0f0;
		width: 50%;
		h3 {
			margin: 5px;
		}
	}
	.sort-form {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.users-display {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
	}
	.user-item {
		flex: 0 0 180px;
		max-width: 180px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.user-item p, a {
		width: 100%;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.pagination-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
</style>
