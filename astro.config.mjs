import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'
import remarkUnwrapImages from 'remark-unwrap-images'

function defaultLayoutPlugin() {
  return function (tree, file) {
    file.data.astro.frontmatter.layout =
      file.data.astro.frontmatter.layout || '@layouts/BlogLayout.astro'
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://passkeys-playground.slashid.dev/',
  markdown: {
    remarkPlugins: [defaultLayoutPlugin, remarkUnwrapImages],
    rehypePlugins: [['rehype-img-size', { dir: 'public' }]],
    extendDefaultPlugins: true,
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  integrations: [svelte()],
})
