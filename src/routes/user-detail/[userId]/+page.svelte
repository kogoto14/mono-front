<script lang="ts">
    import type { PageData } from './$types';
    import { navigating } from '$app/stores';
    export let data: PageData;
</script>

<h2>ユーザー詳細画面</h2>

{#if $navigating}
    <p>Loading...</p>
{:else}
    <div class="user-detail">
        <p>ID: {data.userDetail.id}</p>
        <p>Name: {data.userDetail.name}</p>
        <p>Email: {data.userDetail.email}</p>
        <p>Phone: {data.userDetail.phone}</p>
        <p>Address: {data.userDetail.address}</p>
        <p>CreatedAt: {data.userDetail.createdAt}</p>
        <p>UpdatedAt: {data.userDetail.updatedAt}</p>
    </div>
{/if}
