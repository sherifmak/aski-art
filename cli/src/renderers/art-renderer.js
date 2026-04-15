// ASCII art library renderer

const ART_LIBRARY = {
  // ─── Animals ───────────────────────────────────────────────────────────────
  cat: {
    category: 'animals',
    art: `  /\\_/\\
 ( o.o )
  > ^ <
 /|   |\\
(_|   |_)`,
  },

  dog: {
    category: 'animals',
    art: `    / \\__
   (    @\\___
   /         O
  /   (_____/
 /_____/   U`,
  },

  dragon: {
    category: 'animals',
    art: `                 /\\    .-" /
                /  ; .'  .'
               :   ;/  .'
                \\  '-  /
        __.---.__\\  _ /
    .-""   __..--""  ""--.
   /    .-"               \\
  ;   .'                  ;
  :  ;                    :
  ;  :      ~  DRAGON ~   ;
  :  ;                    :
   \\  \\                  /
    \\  "-.           _.-"
     "-._ "-.___.--""
         """---"`,
  },

  fish: {
    category: 'animals',
    art: `    /\`·.¸
   /¸...¸\`:·
 ¸.·´  ¸   \`·.¸.·´)
: © ):´;      ¸  {
 \`·.¸ \`·  ¸.·´\\\`·¸)
     \`\\\\´´\\¸.·´`,
  },

  owl: {
    category: 'animals',
    art: `   ,___,
   (O,O)
   /)__)
  -"--"-
 /|    |\\
(_|    |_)`,
  },

  unicorn: {
    category: 'animals',
    art: `        \\
         \\>
      ___|_____
     /  /|     \\
    /  / |      \\
   /  /  |  ()   \\
  /  /   |        \\
 /  /    |  ()    |
(  (     |        |
 \\  \\    |   ()  /
  \\  \\___|______/
   \\_/   |
     |   |
     |___|
    /     \\
   /       \\`,
  },

  whale: {
    category: 'animals',
    art: `            .
           ":"
         ___:____     |"\\/"|
       ,'        \`.    \\  /
       |  O        \\___/  |
    ~^~^~^~^~^~^~^~^~^~^~^~`,
  },

  // ─── Objects ───────────────────────────────────────────────────────────────
  rocket: {
    category: 'objects',
    art: `        /\\
       /  \\
      / .. \\
     | /  \\ |
     |/    \\|
     ||    ||
     ||    ||
    /||    ||\\
   / ||    || \\
   \`-|______|-'
      |_|  |_|
     /_/    \\_\\
    ▓▓▓    ▓▓▓
    ░░░    ░░░`,
  },

  sword: {
    category: 'objects',
    art: `       /\\
      /  \\
     /    \\
    /      \\
   /________\\
       ||
       ||
       ||
       ||
       ||
    ───||───
       ||
       /\\
      /  \\`,
  },

  coffee: {
    category: 'objects',
    art: `      ( (
       ) )
    .________.
    |        |]
    |  ASKI  |]
    |  ART   |]
    |________|
    /________\\`,
  },

  computer: {
    category: 'objects',
    art: `   .--------------------.
   |  ________________  |
   | |                | |
   | |  $ aski art    | |
   | |  > cat         | |
   | |     /\\_/\\      | |
   | |________________| |
   |____________________|
      \\________________/
       \\_____________/`,
  },

  crown: {
    category: 'objects',
    art: `      .·:*¨¨*:·.
     /\\  /\\  /\\
    /  \\/  \\/  \\
   |    |  |    |
   |____________|
   |            |
   |____________|`,
  },

  guitar: {
    category: 'objects',
    art: `          ______
         //    \\\\
        //      \\\\
       ||________||
       ||   ||   ||
       ||   ||   ||
        \\\\  ||  //
         \\\\ || //
          \\\\||//
           ||||
           ||||
           ||||
         __||||__
        /   ||   \\
       /   /  \\   \\
      |   /    \\   |
      |  |      |  |
       \\  \\    /  /
        \\__\\__/__/`,
  },

  shield: {
    category: 'objects',
    art: `     ,+++++++++,
    /           \\
   /  ┌───────┐  \\
  |   │       │   |
  |   │  ★ ★  │   |
  |   │  ★★★  │   |
  |   │ ★★★★★ │   |
  |   │  ★★★  │   |
  |   └───────┘   |
   \\             /
    \\           /
     \\         /
      \\       /
       \\     /
        \\   /
         \\ /
          V`,
  },

  // ─── Symbols ───────────────────────────────────────────────────────────────
  skull: {
    category: 'symbols',
    art: `      ______
     /      \\
    | ◉    ◉ |
    |    ▼    |
    |  \\___/  |
     \\______/
       || ||`,
  },

  heart: {
    category: 'symbols',
    art: `    ♥♥♥   ♥♥♥
   ♥♥♥♥♥ ♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥♥♥♥♥
   ♥♥♥♥♥♥♥♥♥♥♥
    ♥♥♥♥♥♥♥♥♥
     ♥♥♥♥♥♥♥
      ♥♥♥♥♥
       ♥♥♥
        ♥`,
  },

  lightning: {
    category: 'symbols',
    art: `      __________
     /          /
    /    ______/
   /    /______
  /          /
 /    ______/
/    /
\\___/`,
  },

  checkmark: {
    category: 'symbols',
    art: `             _
            | |
      _     | |
     | |   / /
      \\ \\_/ /
       \\   /
        \\_/`,
  },

  star: {
    category: 'symbols',
    art: `        ·  .
       * _ *
    ___/ _ \\___
   \\___   ___/
       / _ \\
      * / \\ *
     .  ·  .`,
  },

  // ─── Decorations ───────────────────────────────────────────────────────────
  'divider-fancy': {
    category: 'decorations',
    art: `═══╡ ◆ ╞═══════════════════════╡ ◆ ╞═══`,
  },

  'divider-wave': {
    category: 'decorations',
    art: `~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~`,
  },

  frame: {
    category: 'decorations',
    art: `╔══════════════════════════════════╗
║  ╔══╗                    ╔══╗    ║
║  ║◆◆║                    ║◆◆║    ║
║  ╚══╝                    ╚══╝    ║
║                                  ║
║                                  ║
║                                  ║
║                                  ║
║  ╔══╗                    ╔══╗    ║
║  ║◆◆║                    ║◆◆║    ║
║  ╚══╝                    ╚══╝    ║
╚══════════════════════════════════╝`,
  },
};

const CATEGORIES = ['animals', 'objects', 'symbols', 'decorations'];

export function renderArt(options = {}) {
  const { name } = options;
  if (!name) {
    return 'Error: --name is required. Use --list to see available art.';
  }

  const entry = ART_LIBRARY[name];
  if (!entry) {
    const available = Object.keys(ART_LIBRARY).join(', ');
    return `Unknown art: "${name}"\nAvailable: ${available}`;
  }

  return entry.art;
}

export function listArt(category) {
  const lines = [];

  const categoriesToShow = category
    ? [category]
    : CATEGORIES;

  for (const cat of categoriesToShow) {
    const entries = Object.entries(ART_LIBRARY).filter(([, v]) => v.category === cat);
    if (entries.length === 0) continue;

    lines.push(`\n  ${cat.toUpperCase()}`);
    lines.push(`  ${'─'.repeat(40)}`);
    for (const [name] of entries) {
      lines.push(`    • ${name}`);
    }
  }

  if (lines.length === 0) {
    return `No art found for category: "${category}"\nAvailable categories: ${CATEGORIES.join(', ')}`;
  }

  lines.unshift('Available ASCII Art:');
  lines.push('');
  lines.push(`Use: aski art --name <name>`);
  return lines.join('\n');
}
