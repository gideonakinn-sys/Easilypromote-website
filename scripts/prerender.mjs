/*
 * Writes real HTML for every route that does not depend on the scroll intro.
 *
 * The site is a client-rendered SPA behind a catch-all rewrite, so anything
 * that does not run JavaScript — crawlers, link scanners, the automated pass
 * in an app review — saw the same empty 2.3kB shell on every path, legal
 * pages included. Each route below is rendered with the real component tree
 * and its own <title>, description and canonical, then written as a static
 * file that Vercel serves directly (cleanUrls maps /terms -> terms.html).
 *
 * Home stays a shell on purpose: its hero is animated in from a hidden state,
 * so shipping the finished markup would flash the whole page before GSAP takes
 * over. Its description meta already carries the summary.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const { render, ROUTE_META, SITE } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href,
)

const ROUTES = Object.entries(ROUTE_META)
  .filter(([, meta]) => meta.file)
  .map(([url, meta]) => ({ url, ...meta }))
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const canonical = route.noindex ? null : `${SITE}${route.url}`

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
      `$1${route.description}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/,
      `$1${route.title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/,
      `$1${route.description}$2`,
    )

  html = canonical
    ? html
        .replace(
          /(<meta property="og:url" content=")[^"]*(")/,
          `$1${canonical}$2`,
        )
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    : html
        .replace(/\s*<meta property="og:url"[^>]*>/, '')
        .replace(/\s*<link rel="canonical"[^>]*>/, '')

  if (route.noindex) {
    html = html.replace(
      '</title>',
      '</title>\n    <meta name="robots" content="noindex" />',
    )
  }

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${render(route.url)}</div>`,
  )

  fs.writeFileSync(path.join(dist, route.file), html)
  console.log(`prerendered ${route.url} -> dist/${route.file}`)
}
