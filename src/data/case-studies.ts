/**
 * The story behind each project, shown at /projects/<slug>.
 * Written the way I'd tell it to someone: what the project does and why it's built that way.
 * Leave out the behind-the-scenes: bugs found along the way, failed attempts, tools and workflow.
 * Security details and limits stay out of public pages too.
 */
export interface CaseStudy {
  /** What the project had to solve. */
  problem: string;
  decisions: { title: string; text: string }[];
  learned: string[];
  next: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "mako-works": {
    problem:
      "Most store demos look the same: a grid of cards and a cart icon. I wanted a shop for consoles, games and PC parts that looked like nothing else, and that still worked like a real one underneath: a catalog you can filter, stock that runs out, orders that get saved, and a way to build a PC without picking parts that don't fit together.",
    decisions: [
      {
        title: "The home page is a motherboard",
        text: "The featured product sits in the CPU socket and each category is a chip wired to it. Point at a chip and current runs down its trace; add something to the cart and a pulse travels to it. I kept that one idea and let everything else stay quiet: products are drawn as part footprints, with the reference code a real board would print next to them.",
      },
      {
        title: "The last unit can't sell twice",
        text: "Placing an order takes the stock off in the same database transaction that saves it, and the table refuses to go below zero. If two people check out the last graphics card at once, one order goes through and the other is told it just sold out.",
      },
      {
        title: "One set of compatibility rules",
        text: "The PC builder checks the socket, DDR4 or DDR5, board size against the case, card length, cooler height, radiator size and power draw. The rules live in one file that the page and the server both use, and parts that won't fit say why instead of just disappearing.",
      },
    ],
    learned: [
      "A store lives or dies by its catalog. Real specs and real product photos, each one credited, make the whole thing feel trustworthy in a way no layout can.",
      "Telling people why something doesn't fit is worth more than hiding it. A builder that explains itself teaches you something about PCs along the way.",
    ],
    next: ["Accounts, so orders follow you between devices", "Reviews written by people, not generated", "Saving and sharing PC builds by link"],
  },
  "angry-cats-need-naps": {
    problem:
      "Mine-sweeping games have one classic annoyance: sometimes you lose to a coin flip, not to a bad decision. I wanted a version where logic always gets you there, wrapped in a reason to come back: cats to rescue, a run-down shelter to fix up, and a daily board everyone shares.",
    decisions: [
      {
        title: "Every board can be solved with logic",
        text: "Before a board reaches you, a small solver has to finish it using only deductions, never guesses. If it can't, the board is thrown away and a new one is made. If you lose, it was a call you made, not luck.",
      },
      {
        title: "Sound with no audio files",
        text: "The effects and the music are synthesized in the browser with the Web Audio API, in a retro style. Nothing to download and no licenses to track, and every move gets the right sound from one place.",
      },
      {
        title: "Real pixel art",
        text: "The art is AI-generated, and the game says so. Each image is redrawn on an actual pixel grid with a limited palette, so everything shares the same crisp retro look, and the shelter's rooms go from run-down to cozy as you fix them up.",
      },
    ],
    learned: [
      "A daily challenge is mostly about time. Streaks, midnight and time zones need as much care as the puzzle itself.",
      "Phones and computers treat touch and sound differently, so a game has to be played on both to feel right on both.",
    ],
    next: ["More logic games in the same shelter", "Expeditions: several boards in a row with rules that change", "Testing it on more real phones"],
  },
  nimbo: {
    problem:
      "Most weather apps give you a temperature and a little cloud, and that's about it. I wanted one that keeps going when you have more questions: how sure is this forecast? Is today weird for this time of year? When's the best hour to go out? And I wanted all of that with no account and no paid API.",
    decisions: [
      {
        title: "No server of mine in the middle",
        text: "Your browser asks the weather services directly. They're free and don't need a key, and since each visitor makes their own requests, a busy day can't burn through some shared allowance.",
      },
      {
        title: "I left AI out of this one",
        text: "The summary at the top sounds like it could be AI, but it's just rules. It shows up instantly, costs nothing, and I can test it. The warnings come from fixed thresholds too, and the app says clearly that they aren't official alerts, because they aren't.",
      },
      {
        title: "Thirty small requests instead of a giant one",
        text: "To compare today against the 1991 to 2020 climate you need thirty years of data. Asking for it all at once is really heavy on the service, so I ask one year at a time, a few at once, and save the result in your browser. If you come back to the same place it doesn't ask again.",
      },
    ],
    learned: [
      "Free data comes with real conditions: credits, fair use, how often you can ask. Designing around them from the start shaped the whole app.",
      "Weather changes every minute, so the app is tested against saved forecasts. That way a test checks the app, not the sky.",
    ],
    next: ["Official alerts, wherever there's an open source for them", "A Spanish version", "Making it installable, so the last forecast still works offline"],
  },
  telar: {
    problem:
      "My brother Julian designed a visual builder for AI agents, and I wanted to know if I could turn it into something that really runs. So: blocks on a canvas, wired together, calling real models, with no sign-up and nothing to pay for whoever tries it.",
    decisions: [
      {
        title: "Each model gets the job it's good at",
        text: "Free models differ a lot in speed and accuracy, so I compared them before offering any. The quickest ones handle the chatty parts, and a more careful one decides the yes-or-no conditions that send a message down one path or another.",
      },
      {
        title: "Adapting the design to the web",
        text: "Julian's design runs Python in its code blocks and has an \"activate\" step. Telar runs JavaScript right in the browser, and you get a Share link instead. Blocks that aren't built yet are greyed out and say so.",
      },
      {
        title: "Tests that don't depend on AI",
        text: "The browser tests go through the whole canvas with simulated answers, so they're fast and give the same result every time.",
      },
    ],
    learned: [
      "Building on top of AI means designing for waiting: an answer can take a second or much longer, so the interface always shows what's going on.",
      "Turning someone else's design into a working product is a conversation. Every screen raises questions about what should actually happen.",
    ],
    next: ["Vision blocks", "Reading PDFs in the browser", "Comparing two versions side by side in the playground"],
  },
  cantera: {
    problem:
      "Another one of Julian's designs, this time a talent platform for esports. The tricky part: a social product feels dead without people, and this is a public demo with no real users, no real brands, and nobody around to moderate it.",
    decisions: [
      {
        title: "Everyone gets their own private world",
        text: "Your profile, applications and posts are only visible to you, so nobody has to moderate strangers on a public site. The app tells you this right where you post.",
      },
      {
        title: "The recruiters are AI",
        text: "Messaging is no fun if nobody answers, so made-up recruiters reply using AI. You can also jump in as a guest with a sample profile and skip giving an email.",
      },
      {
        title: "A whole invented scene",
        text: "Every team and game is original. Each game has its own idea, like a MOBA where the tide floods the map every six minutes, and each team has a story, colors and fans. The app says the characters are fictional.",
      },
    ],
    learned: [
      "Working with the designer pays off. Julian's review shaped the final version, from the mobile navigation to how much personality the games and teams have.",
      "On a phone, clear labels beat clever icons.",
    ],
    next: ["Letting a guest become a real account without losing anything", "A public player profile you can share"],
  },
  "collab-notes": {
    problem:
      "A document editor where several people write at the same time and watch each other's changes appear, with comments attached to the text, a version history, and documents you can open from a link.",
    decisions: [
      {
        title: "One Durable Object per document",
        text: "Each open document gets its own small coordinator on Cloudflare, and its connections sleep while nobody's typing. It keeps the realtime part fast and on a free plan.",
      },
      {
        title: "A public guide as the demo",
        text: "Nobody wants to log in just to see what an app does. So the guide opens for anyone, and signing in with GitHub lets you edit it and make your own documents. Other people can edit it too, so please be nice to it.",
      },
      {
        title: "Clear roles",
        text: "Owners, signed-in visitors and people just reading each get exactly what they need, and the guide spells it out so nobody has to guess.",
      },
    ],
    learned: [
      "Collaboration features only really get tested with several people at once. Two accounts in two browsers is the minimum.",
    ],
    next: ["Comparing versions in the history view", "True simultaneous editing with Yjs, so two people can type in the same paragraph at once"],
  },
  "journal-app": {
    problem:
      "A personal journal with real accounts. You write in Markdown, tag your entries, search them and export them. The one thing that couldn't go wrong: nobody gets to read an entry that isn't theirs.",
    decisions: [
      {
        title: "Checking ownership on the server",
        text: "Hiding a button doesn't protect anything. Every route that reads or changes an entry checks on the server that it's yours.",
      },
      {
        title: "Making it feel like a notebook",
        text: "Warm paper colors and a serif font. It's a place to write, so I didn't want it looking like a control panel.",
      },
    ],
    learned: ["Privacy isn't a feature you add at the end. It has to be part of every request from the start."],
    next: ["Moving the data to Cloudflare D1, alongside my other projects"],
  },
  "interactive-dashboard": {
    problem:
      "A dashboard with charts, reports and settings, built to feel like a real product even though the data is a sample.",
    decisions: [
      {
        title: "Every control does something",
        text: "Logout shows a signed-out screen, the notifications switch shows or hides a bell, and the language switch changes everything between English and Spanish, months and currency included. Features that would need a real server aren't faked.",
      },
      {
        title: "A light theme from one color scale",
        text: "Light mode redefines the color scale instead of styling every component twice: dark grays turn light and the bright accents get darker so you can still read them.",
      },
      {
        title: "Being upfront that it's sample data",
        text: "There's no backend, your settings stay in your browser, and the footer says the data is a sample.",
      },
    ],
    learned: ["A demo earns trust when every control does what it says, even the small ones nobody expects to click."],
    next: ["Real data from a free public API, maybe my own GitHub activity"],
  },
  "calculator-app": {
    problem:
      "It's a calculator, so everyone already knows how it should behave, and that's what makes it interesting. It has keyboard input, memory, history, and a programmer mode with binary and hex. There's nowhere to hide, so the small details are the whole project.",
    decisions: [
      {
        title: "Showing what a person expects",
        text: "Computers do decimals in binary, so 1.1 + 2.2 can come out as 3.3000000000000003. Results are rounded so you see 3.3, and dividing by zero tells you in plain words that you can't.",
      },
      {
        title: "Animation in CSS",
        text: "The moving grid in the background is pure CSS, so it never makes the calculator itself redraw.",
      },
      {
        title: "Tested logic",
        text: "Working out an expression is plain logic with no interface attached, and it's covered by automated tests.",
      },
    ],
    learned: ["Even something this small is full of decisions. What does a digit do right after equals? What about a second operator in a row?"],
    next: ["Parentheses and percentages"],
  },
  portfolio: {
    problem:
      "A home for my projects that's fast, easy to keep up to date, and still has some personality. Most of it is just content, so it didn't need a server at all.",
    decisions: [
      {
        title: "Astro for a static site",
        text: "The site ships plain pages and only loads JavaScript where it's needed, like the 3D globe and the contact form. No server means nothing to maintain at runtime.",
      },
      {
        title: "Everything has to be free",
        text: "That's the rule for all of these projects, and it really does shape the decisions. I also prefer services that just stop at their limit over ones that start charging you.",
      },
      {
        title: "The cat stays",
        text: "Hover over the F in the corner and there's a cat. It's in every project too, because my actual cat could get angry otherwise. This one wasn't up for debate.",
      },
    ],
    learned: ["Browsing your own site like a visitor, on a phone and a computer, is the best review there is."],
    next: ["More case studies as the projects grow"],
  },
};
