#!/usr/bin/env node

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const MODEL = 'gemini-2.0-flash-preview-image-generation';

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { prompt: null, image: null, output: null };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prompt' || args[i] === '-p') opts.prompt = args[++i];
    else if (args[i] === '--image' || args[i] === '-i') opts.image = args[++i];
    else if (args[i] === '--output' || args[i] === '-o') opts.output = args[++i];
    else if (!opts.prompt && !args[i].startsWith('-')) opts.prompt = args[i];
  }

  return opts;
}

function mimeTypeFromPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };
  return map[ext] || 'image/jpeg';
}

function buildOutputPath(opts) {
  if (opts.output) return opts.output;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return path.join(process.cwd(), `generated-${timestamp}.png`);
}

async function main() {
  const opts = parseArgs();

  if (!opts.prompt) {
    console.error('Usage: node generate-image.js --prompt "your prompt" [--image ./ref.png] [--output ./out.png]');
    process.exit(1);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable not set.');
    console.error('Get your key at: https://aistudio.google.com/app/apikey');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  // Build content parts
  const parts = [{ text: opts.prompt }];

  if (opts.image) {
    const imagePath = path.resolve(opts.image);
    if (!fs.existsSync(imagePath)) {
      console.error(`Error: Image file not found: ${imagePath}`);
      process.exit(1);
    }
    const imageData = fs.readFileSync(imagePath).toString('base64');
    const mimeType = mimeTypeFromPath(imagePath);
    parts.unshift({ inlineData: { data: imageData, mimeType } });
    console.log(`Using reference image: ${imagePath}`);
  }

  console.log(`Generating image with prompt: "${opts.prompt}"`);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts }],
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  const candidates = response.candidates;
  if (!candidates?.length) {
    console.error('No response from model.');
    process.exit(1);
  }

  let saved = false;
  for (const part of candidates[0].content.parts) {
    if (part.inlineData?.mimeType?.startsWith('image/')) {
      const outputPath = buildOutputPath(opts);
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`Image saved: ${path.resolve(outputPath)}`);
      saved = true;
      break;
    } else if (part.text) {
      console.log(`Model: ${part.text}`);
    }
  }

  if (!saved) {
    console.error('No image was returned. The model may have declined or returned text only.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
