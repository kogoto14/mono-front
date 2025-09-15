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

    // 4. Logic
    import Thing from './Thing.svelte';
    import { roll } from './utils.js';
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let selected = $state(colors[0]);
    let things = $state([
        { id: 1, name: 'apple' },
        { id: 2, name: 'banana' },
        { id: 3, name: 'carrot' },
        { id: 4, name: 'doughnut' },
        { id: 5, name: 'egg' }
    ]);
    let promise =$state(roll());
</script>

<style>
    /* 1. Introduction */
    p {
        color: goldenrod;
        front-family: 'Comic Sans MS', cursive;
        font-size: 2em;
    }

    /* 4. Logic */
    h1 {
		font-size: 2rem;
		font-weight: 700;
		transition: color 0.2s;
	}

	div {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

	button {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px,-2px);
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
		color: black;
		font-weight: 700;
		font-size: 2rem;
	}

	button[aria-current="true"] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}
</style>

<!-- 1. Introduction -->
<h1>Hello {name.toUpperCase()}!</h1>
<img {src} alt="{name} dances." />
<p>This is a paragraph.</p>
<Nested />
<p>{@html string}</p>


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


<!-- 4. Logic -->
<button onclick={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
</button>
{#if count > 10}
    <p>{count} is greater than 10</p>
{:else if count < 5}
    <p>{count} is less than 5</p>
{:else}
    <p>{count} is between 5 and 10</p>
{/if}

<h1 style="color: {selected}">Pick a colour</h1>
<div>
    {#each colors as color, i}
        <button
            style="background: {color}"
            aria-label={color}
            aria-current={selected === color}
            onclick={() => selected = color}
        >{i + 1}</button>
    {/each}
</div>

<button onclick={() => things.shift()}>
    Remove first things
</button>

{#each things as thing (thing.id)}
    <Thing name={thing.name}/>
{/each}

<button onclick={() => promise = roll()}>
    roll the dise
</button>

{#await promise}
    <p>...rolling</p>
{:then number}
    <p>you rolled a {number}!</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
