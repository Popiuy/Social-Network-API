const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const thoughts = [
  'Streamline choices by tracking pros and cons',
  'Locate misplaced devices effortlessly',
  'Unlock melodies through interactive lessons',
  'Defend galaxies against alien invasions',
  'Strategically protect realms from oncoming hordes',
  'Organize virtual currency in the classic board game',
  'Preview upcoming films and get a sneak peek',
  'A minimalist app for simple greetings',
  'Connect and share in a lighthearted environment',
  'Jot down quick ideas and reminders',
  'Instantly communicate with friends and family',
  'Manage your digital correspondence efficiently',
  'Navigate your surroundings with digital precision',
  'Browse the web using a trusted and versatile browser',
  'Track your jogging progress and stay motivated',
  'Discover recipes and master culinary skills',
  'Play classic card games and test your luck',
  'Monitor and receive updates on your package shipments',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

// getRandomThoughts function that returns an array of strings
const getRandomThoughts = (count) => {
  const randomThoughts = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * thoughts.length);
    randomThoughts.push(thoughts[randomIndex]);
  }
  return randomThoughts;
};


// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };
