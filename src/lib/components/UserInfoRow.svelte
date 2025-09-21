<script lang="ts">
	let { columnName } = $props<{
		columnName: string;
	}>();
</script>

<table class="user-info-row">
	<tbody>
		<tr>
			<th>{columnName}</th>
			<td>
				<slot />
			</td>
		</tr>
	</tbody>
</table>

<style>
	.user-info-row {
		width: 100%;
		border-collapse: collapse;
	}

	.user-info-row th,
	.user-info-row td {
		border: 1px solid #ddd;
		padding: 12px;
		text-align: left;
		vertical-align: middle;
	}

	.user-info-row th {
		background-color: #f7f7f7;
		width: 150px;
	}
</style>
