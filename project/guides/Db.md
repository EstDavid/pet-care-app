# Current DB methods available in data.ts:

## get methods

### getAllUsers()
 : returns the first 10 users. for testing I guess???

### getUserById(id : string) :Promise<IUser | undefined>
returns a user with their petsOwned, petsSitting, messages and stays fields auto-populated

### getPetById(id : string) :Promise<IPet | undefined>
returns a pet with their owner and sitter populated


## add methods
### addUser (firstname: string, surname: string, role: string) :Promise<IUser | undefined>

adds a user to the DB and returns the new user if successful.
firstname and surname are *required*

### addPet (name: string, owner: string, species: string) :Promise<IPet | undefined>
adds a pet to the db and returns new pet if successful.
name and owner (id!) are *required*


