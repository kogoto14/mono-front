<script lang="ts">
	import { goto } from '$app/navigation';
    import { navigating } from '$app/stores';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    // ユーザー検索
    let searchUserId = $state(data.searchUserId);
    let searchUserName = $state(data.searchUserName);
    let users = $derived(data.users);

    function searchUsers() {
        const params = new URLSearchParams();
        if(searchUserId) params.append('id', searchUserId);
        if(searchUserName) params.append('name', searchUserName);

        goto(`?${params.toString()}`, { keepFocus: true, noScroll: true });
    }

    // ページネーション
    let usersPerPage = $state(5);
    let currentPage = $state(1);
    let totalPages = $derived(Math.ceil(users.length / usersPerPage));
    let pagenatedUsers = $derived(() => {
        const start = (currentPage - 1) * usersPerPage;
        const end = start + usersPerPage;
        return users.slice(start, end);
    });
    
    // 検索条件が変更されたらページを1ページ目に戻す
    $effect(() => {
        users;
        currentPage = 1;
    });

    function previousPage() {
        if(currentPage > 1) {
            currentPage -= 1;
        }
    }

    function nextPage() {
        if(currentPage < totalPages) {
            currentPage += 1;
        }
    }
</script>

<h2>ユーザー検索画面</h2>

<!-- 検索フォーム -->
<form onsubmit={(e) => {
    e.preventDefault();
    searchUsers();
}}>
    <h3>ユーザーID:</h3>
    <input type="text" bind:value={searchUserId} />
    <h3>ユーザー名:</h3>
    <input type="text" bind:value={searchUserName} />
    <button type="submit">検索</button>
</form>

<!-- 結果表示欄 -->
{#if $navigating}
    <p>Loading...</p>
{:else if users.length > 0}
<p>全{users.length}件中 {((currentPage - 1) * usersPerPage) + 1}-{Math.min(currentPage * usersPerPage, users.length)}件を表示</p>
<div class="users">
        {#each pagenatedUsers() as user}
            <div class="user-item">
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <a href="/user-detail/{user.id}">詳細</a>
            </div>
        {/each}
        <button onclick={previousPage} disabled={currentPage === 1}>
            前へ
        </button>
        <div class="pagination">
            {#each Array.from({ length: totalPages }) as _, i}
                <button onclick={() => currentPage = i + 1}>{i + 1}</button>
            {/each}
        </div>
        <button onclick={nextPage} disabled={currentPage === totalPages}>
            次へ
        </button>
    </div>
{:else}
    <p>ユーザーが見つかりません。</p>
{/if}
