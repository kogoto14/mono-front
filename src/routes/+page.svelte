

<script lang="ts">
    import Nested from './Nested.svelte'; 
    let name = 'Svelte';
    let src = '/tutorial/image.gif';
    let string = 'this string contains some <strong>HTML!!!</strong>'
</script>

<h1>Hello {name.toUpperCase()}!</h1>
<img {src} alt="{name} dances." />
<p>This is a paragraph.</p>
<Nested />
<p>{@html string}</p>

<style>
    p {
        color: goldenrod;
        front-family: 'Comic Sans MS', cursive;
        font-size: 2em;
    }
</style>
