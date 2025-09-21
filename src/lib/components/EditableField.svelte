<script lang="ts">
	let { value = $bindable(), isEditing = $bindable(), type = 'text' } = $props<{
		value: string;
		isEditing: boolean;
		type?: 'text' | 'email';
	}>();
</script>

{#if isEditing}
    <input type={type} bind:value on:blur={() => isEditing = false} />
{:else}
    <div class="editable-field">
        <span>{value}</span>
        <button type="button" on:click={() => isEditing = true} class="icon-button">✏️</button>
    </div>
{/if}

<style>
    .editable-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		width: 100%;
	}

	.icon-button {
		background: none;
		border: none;
		font-size: 1rem;
		cursor: pointer;
	}

	input {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
	}
</style>
