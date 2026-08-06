import { execFileSync } from 'child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LOCAL_FFMPEG = resolve(__dirname, 'ffmpeg.exe')
const FFMPEG = existsSync(LOCAL_FFMPEG) ? LOCAL_FFMPEG : 'ffmpeg'

const SOURCE = resolve('public/videos')
const OUTPUT = resolve('src/assets/videos')

function ensureFfmpeg() {
  try {
    execFileSync(FFMPEG, ['-version'], { stdio: 'ignore' })
  } catch {
    console.error(
      'ffmpeg not found. Add scripts/ffmpeg.exe (a portable build) or install ffmpeg on your PATH.',
    )
    process.exit(1)
  }
}

mkdirSync(OUTPUT, { recursive: true })

const raw = readdirSync(SOURCE).filter((f) => /\.(mp4|mov|mkv|webm)$/i.test(f))

if (raw.length === 0) {
  console.log('No videos found in public/videos/')
  process.exit(0)
}

ensureFfmpeg()

for (const file of raw) {
  const input = resolve(SOURCE, file)
  const name = file.replace(/\.[^.]+$/, '')
  const outputFile = resolve(OUTPUT, `${name}.mp4`)

  if (existsSync(outputFile)) {
    console.log(`⏭  Skipping ${file} (already processed)`)
    continue
  }

  const sizeMB = (statSync(input).size / 1024 / 1024).toFixed(1)
  console.log(`Processing ${file} (${sizeMB} MB)...`)

  execFileSync(FFMPEG, [
    '-i', input,
    '-t', '5',
    '-vf', 'scale=480:-2,fps=24',
    '-c:v', 'libx264',
    '-crf', '23',
    '-preset', 'fast',
    '-an',
    '-movflags', '+faststart',
    '-y',
    outputFile,
  ], { stdio: 'inherit' })

  const newSize = (statSync(outputFile).size / 1024 / 1024).toFixed(1)
  console.log(`  → ${name}.mp4 (${newSize} MB)`)
}

console.log('\nDone. Videos are in src/assets/videos/')
