<!-- 1. Introduction -->
<p>This is a paragraph.</p>

<!-- 3. Props -->
<script lang="ts">
    let { answer = 'a mystery' } = $props();
</script>

<p>The answer is {answer}</p>
