import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/homepage/page';
import mongoose from 'mongoose';
import {User as IUser} from '../src/lib/db/models/User'


import User from '../src/lib/db/models/User';
import {getAllUsers} from '../src/lib/db/controller/User'
import dbConnect from '../src/lib/db/dbConnect'

let testUser:IUser = {
  email: 'kevin@smithsonian.org',
  firstname: 'kevin',
  surname: 'archaeologist'
}

afterAll(async () => {
  await mongoose.disconnect();
});

describe('connects and finds users', () => {
  it('connects to the db',async () => {
  await dbConnect();


    let users = await User
    .find({})
    .limit(10)


    let testUsers = await getAllUsers()

    expect(users).toEqual(testUsers);
  });
});


