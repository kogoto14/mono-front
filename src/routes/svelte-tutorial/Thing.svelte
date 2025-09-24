<!-- 4. Logic -->
<script>
	const emojis = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

	// the name is updated whenever the prop value changes...
	export let name;

    // ...but `emoji` is fixed upon initialisation
	// @ts-ignore
	const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
