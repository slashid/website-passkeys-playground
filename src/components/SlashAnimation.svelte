<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { circInOut } from 'svelte/easing'

  export let titles: string[]
  export let as: 'h1' | 'h2' | 'h3' | 'h4' = 'h1'

  $: max = titles.reduce((acc, item) => {
    if (item.length > acc.length) acc = item

    return acc
  }, '')

  let titleIteration: number = 0
  let dotIteration: number = 0

  $: title = titles[titleIteration % titles.length]
  $: dots = titles[dotIteration % titles.length]

  let timeout: NodeJS.Timer

  const animationDuration = 500
  const progress = tweened(1, {
		duration: animationDuration,
		easing: circInOut
	})

  const next = () => {
    // only animate if it's 0 or 1

    if ($progress === 0) {
      // only dots are showing, change title
      titleIteration += 1;
      // move right
      progress.set(1)
      // set timeout to move left
      timeout = setTimeout(next, animationDuration + 2000)
    }

    if ($progress === 1) {
      // only title is showing, change dots
      dotIteration += 1;
      // move left
      progress.set(0)
      // set timeout to move right
      timeout = setTimeout(next, animationDuration + 100)
    }
  }

  onMount(() => {
    timeout = setTimeout(next, 2000)
  })

  onDestroy(() => clearTimeout(timeout))
</script>

<div class="root" style="--x-percentage: {`${$progress * 100}%`}">
  <div class="inner">
    <span class="hidden font-slash-animation">
      {max}
    </span>
    <span class="dots font-slash-animation">
      {dots.replaceAll(/./gim, '•')}
    </span>
    <div class="title">
      <svelte:element this={as} class="font-slash-animation">
        {title}
      </svelte:element>
    </div>
    <div class="slash" />
  </div>
</div>

<style lang="postcss">
  .root {
    width: 100%;
    max-width: 95vw;
    margin: 0 auto;

    padding: var(--space-24px);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inner {
    position: relative;

    padding: var(--space-16px) 0;
  }

  .hidden {
    opacity: 0;

    padding: 0 var(--space-8px);
  }

  .font-slash-animation {
    font-size: clamp(var(--font-size-2xl), 6vw, var(--font-size-6xl));
    font-weight: var(--font-weight-bold);
    line-height: var(--font-line-height-tight);
    letter-spacing: var(--font-letter-spacing-tigher);
  }

  .title, .dots {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    color: var(--color-foreground);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(to right, hsl(var(--color-accent-hsl) / 0), hsl(var(--color-accent-hsl) / 0.15));

    clip-path: polygon(0 0, var(--x-percentage) 0, var(--x-percentage) 120%, 0 120%);
  }

  .dots {
    color: var(--color-tertiary);

    clip-path: polygon(var(--x-percentage) 0, 100% 0, 100% 120%, var(--x-percentage) 120%);
  }

  .slash {
    width: clamp(8px, 1vw, 20px);
    height: 100%;
    top: 50%;

    background-color: var(--color-accent);

    border-radius: var(--radii-xxs);

    @media (--md) {
      border-radius: var(--radii-xs);
    }

    position: absolute;
    left: var(--x-percentage);
    transform: skewX(-5deg) translateX(-10px) translateY(-50%);

    box-shadow: var(--shadow-lg);
  }
</style>