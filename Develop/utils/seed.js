const connection = require('../config/connection');
const { Thought, User } = require('../models'); 
const { getRandomName, getRandomThoughts } = require('./data'); 

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections 
  await Promise.all([
    Thought.deleteMany({}),
    User.deleteMany({})
  ]);

 
  // Create empty array to hold the users
  const users = [];

  // Loop 10 times 
  for (let i = 0; i < 10; i++) {
    const username = getRandomName(10);
    const email = `${username}@gmail.com`;

    users.push({
      username,
      email,
    });
  }

  await User.insertMany(users);

  const thoughtArr = [];

  // Loop 10 times 
  for (let i = 0; i < 10; i++) {
    const thoughts = getRandomThoughts(10);

    thoughtArr.push({
      thoughts,
    });
  }

  await Thought.insertMany(thoughtArr);

  console.table(users);
  console.table(thoughtArr);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
