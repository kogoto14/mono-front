<script lang="ts">
	import { goto } from '$app/navigation';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    // ユーザー検索
    let searchUserId = $state(data.searchUserId);
    let searchUserName = $state(data.searchUserName);
    
    // ユーザー一覧
    let totalUsers = $state(data.totalCount);
    let pagenatedusers = $derived(data.userSummaries);

    // ソート
    let sortKey = $state(data.sortKey);
    let sortOrder = $state(data.sortOrder);
    
    // ページネーション
    let limit = $state(Number(data.limit));
    let currentPage = $state(1);
    let totalPages = $state(Math.ceil(totalUsers / limit));

    function searchPage(page: number) {
        currentPage = page;
        const params = buildSearchParams();
        goto(`?${params.toString()}`, { keepFocus: true, noScroll: true });
    }

    function buildSearchParams() {
        const params = new URLSearchParams();
        if(searchUserId) params.append('id', searchUserId);
        if(searchUserName) params.append('_name_like', searchUserName);
        if(sortKey) params.append('_sort', sortKey);
        if(sortOrder) params.append('_order', sortOrder);
        if(currentPage) params.append('_page', currentPage.toString());
        if(limit) params.append('_limit', limit.toString());
        
        return params;
    }
</script>

<h2>ユーザー検索画面</h2>

<!-- 検索フォーム -->
<form onsubmit={(e) => { e.preventDefault(); searchPage(1); }}>
    <h3>ユーザーID:</h3>
    <input type="text" bind:value={searchUserId} />
    <h3>ユーザー名:</h3>
    <input type="text" bind:value={searchUserName} />
    <h3>ソートキー:</h3>
    <input type="text" bind:value={sortKey} />
    <h3>ソート順:</h3>
    <input type="text" bind:value={sortOrder} />
    <button type="submit">検索</button>
</form>

<!-- 結果表示欄 -->
{#if pagenatedusers.length > 0}
<div class="users">
        {#each pagenatedusers as user}
            <div class="user-item">
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <a href="/user-detail/{user.id}">詳細</a>
            </div>
        {/each}
        <button onclick={(e) => { e.preventDefault(); searchPage(currentPage - 1); }} disabled={currentPage === 1}>
            前へ
        </button>
        <div class="pagination">
            {#each Array.from({ length: totalPages }) as _, i}
                <button onclick={(e) => { e.preventDefault(); searchPage(i + 1); }}>{i + 1}</button>
            {/each}
        </div>
        <button onclick={(e) => { e.preventDefault(); searchPage(currentPage + 1); }} disabled={currentPage === totalPages}>
            次へ
        </button>
        <p>全{totalUsers}件中 {((currentPage - 1) * limit) + 1}-{Math.min(currentPage * limit, totalUsers)}件を表示</p>
    </div>
{:else}
    <p>ユーザーが見つかりません。</p>
{/if}
