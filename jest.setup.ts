import {TextEncoder, TextDecoder} from 'util';
('./setup.jest.ts');
import '@testing-library/jest-dom';
Object.assign(global, {TextDecoder, TextEncoder});
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
