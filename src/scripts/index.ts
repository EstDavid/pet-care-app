// import mongoose from 'mongoose';
import User, { User as IUser } from '@/lib/db/models/User';
import Pet, { Pet as IPet } from '@/lib/db/models/Pet';
import Message, { IMessage } from '@/lib/db/models/Message';
import Conversation, { IConversation } from '@/lib/db/models/Conversation';
import Stay, { Stay as IStay } from '@/lib/db/models/Stay';
import Update, { Update as IUpdate } from '@/lib/db/models/Update';

const mongoose = require('mongoose');
const User = require('../lib/db/models/User.ts');

const users = require('./users.json');
const pets = require('./pets.json');
const messages = require('./messages.json');
const conversations = require('./conversations.json');
const stays = require('./stays.json');
const updates = require('./updates.json');

const MONGODB_URI = process.env.MONGODB_URI_TEST;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI cannot be retrieved');
}

const clearDatabase = async () => {
  console.log(`Connecting to MongoDB`);

  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log(`Error in connection to MongoDB: ${error.message}`);
    });


  try {
    await User.deleteMany({});
    await Pet.deleteMany({});
    await Message.deleteMany({});
    await Stay.deleteMany({});
    await Update.deleteMany({});
    await Conversation.deleteMany({});
    console.log('Previous database deleted');
  } catch (error) {
    console.error('Error deleting database', error);
  }
};

const createUsers = async (users: IUser[]) => {
  try {
    await User.insertMany(users);
    console.log('Users created successfully.');
  } catch (error) {
    console.error('Error creating users:', error);
  }
};

const createPets = async (pets: IPet[]) => {
  try {
    await Pet.insertMany(pets);
    console.log('Pets created successfully.');
  } catch (error) {
    console.error('Error creating pets:', error);
  }
};

const createMessages = async (messages: IMessage[]) => {
  try {
    await Message.insertMany(messages);
    console.log('Messages created successfully.');
  } catch (error) {
    console.error('Error creating messages:', error);
  }
};

const createStays = async (stays: IStay[]) => {
  try {
    await Stay.insertMany(stays);
    console.log('Stays created successfully.');
  } catch (error) {
    console.error('Error creating stay:', error);
  }
};

const createUpdates = async (updates: IUpdate[]) => {
  try {
    await Update.insertMany(updates);
    console.log('Updates created successfully.');
  } catch (error) {
    console.error('Error creating updates:', error);
  }
};

(async () => {
  // await clearDatabase();
  // await createUsers(users);
  // await createPets(pets);
  // await createMessages(messages);
  // await createStays(stays);
  // await createUpdates(updates);
  // await mongoose.disconnect();
  // process.exit();
})();
