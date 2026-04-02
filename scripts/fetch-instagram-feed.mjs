import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const outputPath = path.join(projectRoot, 'public', 'instagram-feed.json')

const username = process.env.IG_USERNAME || 'psikologacelyasarioglu'
const limit = Number(process.env.IG_LIMIT || 6)

async function readExistingFeed() {
  try {
    const raw = await fs.readFile(outputPath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { updatedAt: null, source: 'instagram-scrape', posts: [] }
  }
}

async function writeFeed(feed) {
  await fs.writeFile(outputPath, `${JSON.stringify(feed, null, 2)}\n`, 'utf8')
}

async function fetchInstagramFeed() {
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`

  const response = await fetch(url, {
    headers: {
      'x-ig-app-id': '936619743392459',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Instagram responded with status ${response.status}`)
  }

  const json = await response.json()
  const edges =
    json?.data?.user?.edge_owner_to_timeline_media?.edges ||
    json?.data?.user?.edge_felix_video_timeline?.edges ||
    []

  const posts = edges
    .map((edge) => edge?.node)
    .filter(Boolean)
    .slice(0, limit)
    .map((node) => ({
      id: node.id || node.shortcode,
      permalink: node.shortcode ? `https://www.instagram.com/p/${node.shortcode}/` : 'https://www.instagram.com/',
      image: node.display_url || node.thumbnail_src || '',
      caption: typeof node.edge_media_to_caption?.edges?.[0]?.node?.text === 'string' ? node.edge_media_to_caption.edges[0].node.text : '',
      timestamp: node.taken_at_timestamp || null,
    }))
    .filter((post) => post.image)

  return {
    updatedAt: new Date().toISOString(),
    source: 'instagram-scrape',
    username,
    posts,
  }
}

async function main() {
  const existing = await readExistingFeed()

  try {
    const nextFeed = await fetchInstagramFeed()

    if (!nextFeed.posts.length) {
      throw new Error('No posts returned from Instagram payload')
    }

    await writeFeed(nextFeed)
    console.log(`Instagram feed updated with ${nextFeed.posts.length} posts.`)
  } catch (error) {
    await writeFeed(existing)
    console.warn('Instagram feed update failed. Keeping previous cached feed.')
    console.warn(error instanceof Error ? error.message : String(error))
  }
}

main()
