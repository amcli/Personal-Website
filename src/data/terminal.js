// Questions visitors can ask in the SAM terminal under About Me.
//
// Each entry:
//   question  The main phrasing. `help` lists it, and clicking it in that list asks it.
//   aliases   Optional. Other phrasings that should give the same answer.
//   answer    The reply. Use \n for a line break.
//             Links: write [label](url) anywhere in the answer, e.g.
//             "My favourite is [Song Title](https://open.spotify.com/track/...)".
//             The label shows underlined and opens the url in a new tab. Only http(s)://
//             and mailto: links work; anything else is shown as typed.
//
// Matching ignores case and punctuation. A typed prompt gets an answer when it equals a
// question or alias, or when most of its words appear in one (filler words like "what",
// "is", "your" are ignored), so visitors don't have to type it word for word.
//
// Example shape (not a real entry):
//   { question: "...", aliases: ["...", "..."], answer: "..." },
export const TERMINAL_QA = [
  { question: "hobbies?", answer: "i LOVE to read & write! i also play lots and lots of games including but not limited to Honkai: Star Rail (guess who my favorite character is), Arknights, Monster Hunter: World, Hollow Knight, Sekiro, and League of Legends." },
  { question: "writing projects?", answer: "i'm currently on the editing stage for a sci-fi cyberpunk novel set in China, and working on a few more short stories that are inspired by my personal experiences." },
  { question: "fave game?", answer: "Arknights without debate. talk to me about Arknights and i WILL go on for days. if you're not here for an infodump then i am also a huge fan (though to a far lesser degree) of League of Legends and Monster Hunter." },
  { question: "fave songs?", answer: "my current top 5:\n1. [JANE DOE](https://open.spotify.com/track/4oE7MyJhqSD3BaHRpNs8Nl?si=9df93bf2c7e04212) by Kenshi Yonezu & Hikaru Utada\n2. [One Last Kiss](https://open.spotify.com/track/7kqywgz6h3s9l1sIHnoE3s?si=21639ff211034f47) by Hikaru Utada\n3. [Shirushi](https://open.spotify.com/track/2HYXGZkEv3m7RXuvFMKuU6?si=5d17d6c369ae46ed) by LiSA\n4. [Kaze wo Hamu](https://open.spotify.com/track/68OYaxreTGmAuD9cAztr2p?si=6bf197d48aaf4484) by Yorushika\n5. [FIRESTARTER](https://open.spotify.com/track/6UeSC8jEhf9XmUL8EX2rni?si=dd1c935a5e4f457a) by K/DA" },
  { question: "fave book/series?", answer: "The Devoured Worlds by Megan O'Keefe. the first two books write the characters so well they're practically flying out of the pages." },
  { question: "interesting facts?", answer: "i know how to fence and used to do kendo! i also am a big foodie and love cooking as well." },
];

// First line shown when the terminal loads
export const TERMINAL_GREETING = "SAM query terminal online. Type “help” to list what you can ask.";
