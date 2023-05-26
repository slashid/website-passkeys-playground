<script lang="ts">
  import { interpolate } from '@popmotion/popcorn';
  import { getOffsetTop } from '@common/utils/dom'
  import { onMount } from 'svelte'

  export let src: string

  let scrollY: number
  let windowHeight: number
  let innerWidth: number

  let section: HTMLElement

  let transform: ReturnType<typeof interpolate> = () => 0
  const createTransform = () => {
    const top = getOffsetTop(section)
    transform = interpolate([top - windowHeight, top + windowHeight], ['10%', '-20%'])
  }
  onMount(createTransform)
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} bind:innerWidth on:resize={createTransform} />

<section bind:this={section}>
  <img {src} alt="" style="transform: translateX({transform(scrollY)})" />
</section>

<style lang="postcss">
  section {
    overflow: hidden;
  }

  img {
    width: 180%;

    @media (--md) {
      width: 120%;
    }
  }
</style>