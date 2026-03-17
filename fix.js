const fs = require('fs');
let s = fs.readFileSync('src/index.css', 'utf8');
const p = s.indexOf('\0s\0e\0l\0e\0c\0t\0'); // it might have null bytes
const p2 = s.indexOf('s\0e\0l\0e\0c\0t');
const p3 = s.indexOf('s e l e c t');

let cutIndex = -1;
if(p !== -1) cutIndex = p;
else if(p2 !== -1) cutIndex = p2;
else if(p3 !== -1) cutIndex = p3;
else {
    // maybe just look for the last closing brace after facilities-grid
    const marker = '  .facilities-grid {\n    grid-template-columns: 1fr;\n    gap: 20px;\n  }\n}';
    let mx = s.indexOf(marker);
    if(mx !== -1) cutIndex = mx + marker.length;
}

if(cutIndex !== -1) {
    s = s.slice(0, cutIndex);
}

s += `
select.dropdown-unit {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  color: var(--muted);
  padding-right: 15px;
  cursor: pointer;
  font-size: 1rem;
  outline: none;
}
select.dropdown-unit:focus {
  color: var(--white);
}
select.dropdown-unit option {
  background-color: var(--gray);
  color: var(--white);
}
`;
fs.writeFileSync('src/index.css', s);
