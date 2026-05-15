import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../src/components/LandingPage.jsx');
let c = fs.readFileSync(filePath, 'utf8');

const statsInline = `        </motion.div>

        <motion.div
          className="lp-stats-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px', width: '100%' }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 + i * 0.05 }} style={{ ...cardBase, padding: '18px 12px', textAlign: 'center', minWidth: 0 }}>
              <div style={{ color: '#818cf8', marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <p style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.45rem)', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Featured courses */}`;

// Remove duplicate stats section and merge into hero
const statsSectionRe = /\n      \{\/\* Stats \*\/\}\n      <Section style=\{\{ paddingBottom: '56px' \}\}>[\s\S]*?      <\/Section>\n\n      \{\/\* Featured courses \*\/\}/;

if (statsSectionRe.test(c)) {
  c = c.replace(statsSectionRe, `\n${statsInline}`);
  console.log('Removed duplicate stats section');
}

// Fix grid wrapper closing: </motion.div> then </div> should be </motion.div> then </motion.div>
const wrongCloseRe = /          <\/motion\.div>\n        <\/div>\n      <\/Section>\n\n      \{\/\* Featured courses \*\/\}/;
if (wrongCloseRe.test(c)) {
  c = c.replace(wrongCloseRe, statsInline);
  console.log('Fixed grid close + inlined stats');
}

fs.writeFileSync(filePath, c);
console.log('Done:', filePath);
