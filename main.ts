// A working news-image-daily entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. A starting point, not a winner: replace the image. The gate takes a
// whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import sharp from 'sharp';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';

const width = 1024;
const height = 1024;

async function generateImage() {
    const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? './out';
    mkdirSync(outputDir, { recursive: true });
    const outputPath = join(outputDir, 'entry.png');

    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f4f4f4" />
        
        <!-- Header -->
        <rect width="100%" height="80" fill="#2c3e50" />
        <text x="50%" y="55" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle">GLOBAL NEWS RECAP: NOV 25, 2026</text>
        
        <!-- Section: US Tariffs -->
        <rect x="50" y="120" width="924" height="240" rx="10" fill="white" stroke="#bdc3c7" stroke-width="2" />
        <text x="70" y="160" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#c0392b">US SECTION 301 TARIFF PROPOSALS</text>
        <text x="70" y="200" font-family="Arial, sans-serif" font-size="22" fill="#34495e">
            <tspan x="70" dy="0">Proposed tariffs targeting China, the EU, and 12 other trading partners.</tspan>
            <tspan x="70" dy="30">The move signals a significant escalation in global trade tensions.</tspan>
            <tspan x="70" dy="30">Markets brace for potential retaliatory measures from major economies.</tspan>
        </text>

        <!-- Section: Hormuz Mines -->
        <rect x="50" y="400" width="924" height="240" rx="10" fill="white" stroke="#bdc3c7" stroke-width="2" />
        <text x="70" y="440" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#e67e22">STRAIT OF HORMUZ ESCALATION</text>
        <text x="70" y="480" font-family="Arial, sans-serif" font-size="22" fill="#34495e">
            <tspan x="70" dy="0">Oil tankers report hitting naval mines in the strategic waterway.</tspan>
            <tspan x="70" dy="30">Incidents occur amid rising regional tensions and naval buildup.</tspan>
            <tspan x="70" dy="30">Global energy supply concerns mount as shipping routes become perilous.</tspan>
        </text>

        <!-- Section: Ukraine Strike -->
        <rect x="50" y="680" width="924" height="240" rx="10" fill="white" stroke="#bdc3c7" stroke-width="2" />
        <text x="70" y="720" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#2980b9">UKRAINE AIRBASE STRIKE</text>
        <text x="70" y="760" font-family="Arial, sans-serif" font-size="22" fill="#34495e">
            <tspan x="70" dy="0">Successful strike on Savasleyka airbase in Russian territory.</tspan>
            <tspan x="70" dy="30">Five Russian military aircraft confirmed damaged or destroyed.</tspan>
            <tspan x="70" dy="30">The operation marks a deep-strike capability milestone for Ukraine.</tspan>
        </text>

        <!-- Footer -->
        <text x="50%" y="1000" font-family="Arial, sans-serif" font-size="16" fill="#7f8c8d" text-anchor="middle">Deterministic Infographic Generated for Gemini CLI | Publication-Grade Summary</text>
    </svg>
    `;

    await sharp(Buffer.from(svg))
        .png({ compressionLevel: 9, adaptiveFiltering: false, palette: true })
        .toFile(outputPath);

    console.log(`Image saved to ${outputPath}`);
}

generateImage().catch(console.error);
