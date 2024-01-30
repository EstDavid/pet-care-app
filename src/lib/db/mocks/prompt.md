Hey ChatGPT, I am working on generating mockdata for a database of a pet sitting app. I would like to have instances of the following models:

- Users
- Pets

For users I would like 5 pet owners and 5 pet sitters. For pets I would like 5 dogs and 5 cats.

Here is the schema for the users:

```
const userSchema = new mongoose.Schema<User>({
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  clerkID: {
    type: String
  },
  role: {
    type: String,
    enum: ['owner', 'sitter']
  },
  pfpUrl: {
    type: String
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  stays: [{
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Stay'
  }],
  petsOwned: [{
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Pet'
  }],
  petsSitting: [{
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Pet'
  }],
  contact: {
    type: contactSchema
  }
}, {
  timestamps: true
});

```

And here is the schema for the pets:

```
const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  species: {
    type: String,
    enum: ['dog', 'cat']
  },
  breed: {
    type: String
  },
  pfpUrl: {
    type: String
  },
  notes: {
    type: String
  },
  sex: {
    type: String
  },
  fixed: {
    type: Boolean
  },
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  vet: {
    type: contactSchema
  }
}, {
  timestamps: true
});
```
