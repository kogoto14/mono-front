<script lang="ts">

    // 1. Introduction
    import Nested from './Nested.svelte'; 
    let name = 'Svelte';
    let src = '/tutorial/image.gif';
    let string = 'this string contains some <strong>HTML!!!</strong>'


    // 2. Reactivity
    import Counter from './Counter.svelte';
    let count = $state(0);
    let numbers = $state([1 ,2 ,3, 4]);
    let total = $derived(numbers.reduce((t, n) => t + n, 0));
    let elapsed = $state(0);
    let interval = $state(1000);

    function increment() {
        count += 1;
    }

    function addNumber() {
        numbers.push(numbers.length + 1);
        $inspect(numbers).with(console.trace);
    }

    $effect(() => {
        const id = setInterval(() => {
            elapsed += 1;
        }, interval);

        return () => {
            clearInterval(id);
        }
    });

    // 3. Props
    import PackageInfo from './PackageInfo.svelte';
    const pkg = {
        name: 'svelte',
        version: '5',
        description: 'blazing fast',
        website: 'https://svelte.dev'
    };
    
</script>

<!-- 1. Introduction -->
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


<!-- 2. Reactivity -->
<button onclick={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
</button>

<p>{numbers.join(' + ')} = {total}</p>

<button onclick={addNumber}>
    Add a number
</button>

<button onclick={() => interval /= 2}>speed up</button>
<button onclick={() => interval *= 2}>slow down</button>

<p>Elapsed: {elapsed} seconds</p>

<Counter />
<Counter />
<Counter />

<!-- 3. Props -->
<Nested answer="42" />
<Nested />
<PackageInfo {...pkg} />
