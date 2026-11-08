/**
 * The story behind each project, shown at /projects/<slug>.
 * Written the way I'd tell it to someone. Keep it to what actually happened.
 * Security details and limits stay out of public pages.
 */
export interface CaseStudy {
  /** What the project had to solve. */
  problem: string;
  decisions: { title: string; text: string }[];
  learned: string[];
  next: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
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
      "The map refused to load until I bundled its worker explicitly and allowed it in the site's content security policy. I kept the strict policy, but now I know every new service I add has to go through it.",
      "The browser tests use saved copies of the weather responses. Otherwise a test could fail just because it started raining somewhere.",
    ],
    next: ["Official alerts, wherever there's an open source for them", "A Spanish version", "Making it installable, so the last forecast still works offline"],
  },
  telar: {
    problem:
      "My brother Julian designed a visual builder for AI agents, and I wanted to know if I could turn it into something that really runs. So: blocks on a canvas, wired together, calling real models, with no sign-up and nothing to pay for whoever tries it.",
    decisions: [
      {
        title: "Trying the models before offering them",
        text: "I tested the free models myself for speed and accuracy. One was the fastest of the bunch, and it also answered \"no\" to all six yes-or-no checks I gave it. Great speed, not much use for making decisions, so a different model handles AI conditions.",
      },
      {
        title: "Changing the design where I had to",
        text: "Julian's design runs Python in its code blocks and has an \"activate\" step. Telar runs JavaScript instead, and you get a Share link. The blocks I haven't built yet are greyed out and say so, because I'd rather show that than a button that does nothing.",
      },
      {
        title: "A fake mode for the tests",
        text: "The browser tests go through the whole canvas with simulated answers. That keeps them fast and repeatable, and they don't spend real model usage every time I run them.",
      },
    ],
    learned: [
      "One model used up its whole token budget thinking and never answered a simple hello. Turning thinking off fixed it and made each call way cheaper. I only found that by looking at what it actually sent back.",
      "A model's speed isn't one number. The same one could answer in a couple of seconds and later take almost twenty, so the interface has to be good at waiting.",
    ],
    next: ["Vision blocks", "Reading PDFs in the browser", "Comparing two versions side by side in the playground"],
  },
  cantera: {
    problem:
      "Another one of Julian's designs, this time a talent platform for esports. The tricky part: a social product feels dead without people, and this is a public demo with no real users, no real brands, and nobody around to moderate it.",
    decisions: [
      {
        title: "Everyone gets their own private world",
        text: "Your profile, applications and posts are only visible to you. It's a bit of a cheat, but it means I don't have to moderate strangers on a public site. The app tells you this right where you post.",
      },
      {
        title: "The recruiters are AI",
        text: "Messaging is no fun if nobody answers, so made-up recruiters reply using AI. You can also jump in as a guest with a sample profile and skip giving an email.",
      },
      {
        title: "Inventing a whole scene",
        text: "Every real person, team, game and logo from the design had to go, so I replaced them with invented ones. The app says the characters are fictional.",
      },
    ],
    learned: [
      "Julian looked at the first version and told me the mobile bar was weird. He was right: it was basically the desktop sidebar lying on its side, with eight icons and no labels. Now there's a top bar and five tabs with actual names.",
      "He also said the games and teams weren't convincing yet. So each one got its own idea, like a MOBA where the tide floods the map every six minutes. That did more for the demo than any visual polish I could have added.",
    ],
    next: ["Letting a guest become a real account without losing anything", "A public player profile you can share"],
  },
  "collab-notes": {
    problem:
      "A document editor where several people write at the same time and watch each other's changes appear, with comments attached to the text, a version history, and documents you can open from a link.",
    decisions: [
      {
        title: "Moving the realtime part to Cloudflare",
        text: "The realtime server was on a platform that started asking for a payment method. Keeping everything free is a hard rule for me, so I moved it. Now each open document gets its own Durable Object, and its connections sleep while nobody's typing.",
      },
      {
        title: "A public guide as the demo",
        text: "Nobody wants to log in just to see what an app does. So the guide opens for anyone, and signing in with GitHub lets you edit it and make your own documents. Other people can edit it too, so please be nice to it.",
      },
      {
        title: "Working out who can do what",
        text: "When I tried it with a second account, I couldn't edit public documents I didn't own, and comments and the copy link button weren't working either. Fixing that forced me to decide exactly what each person is allowed to do. I wrote the answer in the guide.",
      },
    ],
    learned: [
      "Most of those bugs only showed up with two accounts in two browsers. Testing alone, everything looked fine.",
    ],
    next: ["Comparing versions in the history, because right now you restore a bit blind", "True simultaneous editing with Yjs. Today, if two people write at once, the last one wins"],
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
    learned: [
      "Free database clusters can go to sleep if nobody uses them, and then the app just stops working. It happened to this one. That's the kind of problem you never see on your own computer.",
      "The header looked fine on desktop, and on a phone \"Sign In\" was splitting into two lines. Now I check things at phone width as a habit.",
    ],
    next: ["Moving the data to Cloudflare D1, so the app stops depending on a cluster staying awake"],
  },
  "interactive-dashboard": {
    problem:
      "A dashboard with charts, reports and settings. The first version looked finished, and then you started clicking. Logout did nothing. Dark mode, language and two-factor got saved and then ignored.",
    decisions: [
      {
        title: "If a control is there, it has to work",
        text: "Logout now shows a signed-out screen, the notifications switch shows or hides a bell, and the language switch changes everything between English and Spanish, months and currency included. Two-factor and password reset can't work without a server, so I took them out instead of faking them.",
      },
      {
        title: "A light theme without rewriting everything",
        text: "All the components were written with dark colors. Instead of going through every class, light mode redefines the color scale: dark grays turn light and the bright accents get darker so you can still read them.",
      },
      {
        title: "Being upfront that it's fake data",
        text: "There's no backend, your settings stay in your browser, and the footer says the data is a sample.",
      },
    ],
    learned: [
      "Clicking on everything like a stranger would is a test in itself. That's also how a search turned up the table stuck on \"page 2 of 1\".",
    ],
    next: ["Real data from a free public API, maybe my own GitHub activity"],
  },
  "calculator-app": {
    problem:
      "It's a calculator, so everyone already knows how it should behave, and that's what makes it interesting. It has keyboard input, memory, history, and a programmer mode with binary and hex. There's nowhere to hide, so the small details are the whole project.",
    decisions: [
      {
        title: "Showing what a person expects",
        text: "1.1 + 2.2 used to give 3.3000000000000003, which is technically how computers do decimals and also looks broken. Dividing by zero showed Infinity. Now results get rounded, and dividing by zero tells you in plain words that you can't.",
      },
      {
        title: "Moving the background to CSS",
        text: "The moving grid behind it ran on React state, so the whole calculator re-rendered around sixty times a second just to animate a background. In CSS it looks the same and leaves the app alone.",
      },
      {
        title: "Starting my tests here",
        text: "Working out an expression is plain logic with no interface attached, so it's the easiest place to write tests.",
      },
    ],
    learned: [
      "Even something this small is full of decisions. What does a digit do right after equals? What about a second operator in a row? It turns out the space bar could break a calculation, too.",
    ],
    next: ["Parentheses and percentages"],
  },
  portfolio: {
    problem:
      "My old portfolio was a Next.js app, which meant a server and security updates to keep up with, all for what's really just a few pages of content. I liked how it looked, though, so the goal was to keep the look and the colors and drop the rest.",
    decisions: [
      {
        title: "Astro instead of Next.js",
        text: "The site is static, so now it ships plain pages and only loads JavaScript where it's needed, like the 3D globe and the contact form. No server means nothing to patch at runtime.",
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
    learned: [
      "Going through the live sites as a visitor caught things the tests didn't. My favorite: one of my repos had a website link that sent people to a stranger's app.",
    ],
    next: ["More case studies as the projects grow"],
  },
};
