<script lang="ts">

    // 1. Introduction
    import Nested from '../svelte-tutorial/Nested.svelte';

    let name = 'Svelte';
    let src = '/tutorial/image.gif';
    let string = 'this string contains some <strong>HTML!!!</strong>'


    // 2. Reactivity
    import Counter from '../svelte-tutorial/Counter.svelte';

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
    import PackageInfo from '../svelte-tutorial/PackageInfo.svelte';

    const pkg = {
        name: 'svelte',
        version: '5',
        description: 'blazing fast',
        website: 'https://svelte.dev'
    };


    // 4. Logic
    import Thing from '../svelte-tutorial/Thing.svelte';
    import { roll } from '../svelte-tutorial/utils.js';

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
    

    // 5. Events
    import Stepper from '../svelte-tutorial/Stepper.svelte';
    import BigRedButton from '../svelte-tutorial/BigRedButton.svelte';
    import horn from './horn.mp3';

    let m = $state({ x: 0, y: 0});
    let value = $state(0);

    function honk() {
        const audio = new Audio();
        audio.src = horn;
        audio.load();
        audio.play();
    }

    // 6. Bindings
    import { marked } from 'marked';

    let nameForBind = $state('world');
    let a = $state(1);
    let b = $state(2);
    let yes = $state(false);
    let questions = $state([
        {
            id: 1,
            text: `Where did you go to school?`
        },
        {
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
    ]);
    let selectedQuestion = $state(questions[0]);
    let answer = $state('');
    let scoops = $state(1);
    let flavours = $state([]);
    let textAreaValue = $state(`Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`);

    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction'})

    function handleSubmit(e: Event) {
        e.preventDefault();

        alert(
            `answered question ${selectedQuestion.id} ${selectedQuestion.text} with "${answer}"`
        );
    }
</script>

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
<div class='each'>
    {#each colors as color, i}
        <button
            name={`color_${i}`}
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


<!-- 5. Events -->
<div 
    class='event' 
    onpointermove={(event) => {
        m.x = event.clientX;
        m.y = event.clientY;
    }}
>
    The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>

<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
	<input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>

<p>The current value is {value}</p>
<Stepper 
    increment={() => value += 1}
    decrement={() => value -= 1}
/>

<BigRedButton onclick={honk}/>


<!-- 6. Bindings -->
<input bind:value={nameForBind} />
<p>Hello {nameForBind}! </p>

<label>
    <input type="number" bind:value={a} min="0" max="10" />
    <input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
    <input type="number" bind:value={b} min="0" max="10" />
    <input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>

<label>
    <input type="checkbox" bind:checked={yes} />
    Yes! Send me regular email spam
</label>

{#if yes}
    <p>
        Thank you. We will bombard your inbox and sell
        Your personal details.
    </p>
{:else}
    <p>
        You must opt in to contnue. If your're not
        paying, your're the product.
    </p>
{/if}

<button disabled={!yes}>Subscribe</button>

<h2>Insequrity questions</h2>

<form onsubmit={handleSubmit}>
    <select
        bind:value={selectedQuestion}
        onchange={() => (answer = '')}
    >
        {#each questions as question}
            <option value={question}>
                {question.text}
            </option>
        {/each}
    </select>
    <input bind:value={answer} />
    <button disabled={!answer} type="submit">
        Submit
    </button>
</form>

<p>
    selected question {selectedQuestion
        ? selectedQuestion.id
        : '[waiting...]'
    }
</p>

<h2>Size</h2>

{#each [1, 2, 3] as number}
    <label>
        <input
            type="radio"
            name="scoops"
            value={number}
            bind:group={scoops}
        />

        {number} {number === 1 ? 'scoop' : 'scoops'}
    </label>
{/each}

<h2>Flabours</h2>

<select multiple bind:value={flavours}>
    {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
        <option>{flavour}</option>
    {/each}
</select>

<!-- {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
    <label>
        <input
            type="checkbox"
            name="flavours"
            value={flavour}
            bind:group={flavours}
        />

        {flavour}
    </label>
{/each} -->

{#if flavours.length === 0}
    <p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
    <p>Can't order more flavours than scoops!</p>
{:else}
    <p>
        You orderd {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
        of {formatter.format(flavours)}
    </p>
{/if}

<div class="grid">
    input
    <textarea bind:value={textAreaValue}></textarea>

    output
    <div>{@html marked(textAreaValue)}</div>
</div>

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

    .each {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        max-width: 400px;
    }

	[name^='color_']  {
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

    /* 5. Events */
    .event {
        /* position: fixed; */
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

    .grid {
		display: grid;
		grid-template-columns: 5em 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1em;
		height: 100%;
	}

    /* 6. Bindings */
	textarea {
		flex: 1;
		resize: none;
	}
</style>
