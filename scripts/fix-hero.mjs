import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/components/LandingPage.jsx');
let lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

// Find and fix broken hero section around line 565-570 (0-indexed ~564)
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '</Section>' && lines[i + 2]?.trim() === '</motion.div>') {
    // Remove premature </Section> and orphaned </motion.div>
    lines.splice(i, 1); // remove </Section>
    if (lines[i]?.trim() === '</motion.div>') lines.splice(i, 1);
    console.log('Removed broken tags at line', i + 1);
    break;
  }
}

// Fix grid close: line after right card </motion.div> should be </motion.div> not </div>
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Weekly goal almost there') && i + 5 < lines.length) {
    // structure: ... </motion.div> (right card) then should be </motion.div> (grid)
    for (let j = i; j < i + 8; j++) {
      if (lines[j].trim() === '</div>' && lines[j - 1]?.trim() === '</motion.div>') {
        lines[j] = '        </motion.div>';
        console.log('Fixed grid close at line', j + 1);
        break;
      }
    }
    break;
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Fixed', filePath);
