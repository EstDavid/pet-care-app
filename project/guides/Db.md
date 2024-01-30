# Current DB methods available in data.ts:

## User

### GET

### getAllUsers()
 : returns the first 10 users. for testing I guess???

### getUserById(id : string) :Promise<IUser | undefined>
returns a user with their petsOwned, petsSitting, messages and stays fields auto-populated


### getPetsOwnedByUser(id: string):Promise<IPet[] | undefined>
Returns an array of pets owned by a user ID

### getPetsSatByUser(id: string):Promise<IPet[] | undefined>
Returns an array of pets currently sat by user ID

### getUserMessages(id:string):Promise<IMessage[] | undefined>
Returns an array of messages attached to a user ID
!!! not sorted but we might want that?

### Modify

### addUser (user) :Promise<IUser | undefined>
adds a user to the DB and returns the new user if successful.
user must be an object with firstname and surname *required*

### modifyUser(id: string, newValues:IUser):Promise<IUser | undefined>
takes a string id and an user object and overwrites the user with those properties. use carefully please.

### addSatPetToUser(id: string, petId:string):Promise<IUser | undefined>
takes a user id and a pet id and adds that pet to the user's currently sat pets


### _addOwnedPetToUser(id: string, petId:string):Promise<IUser | undefined>
takes a user id and a pet id and adds that pet to the user's owned pets
**IMPORTANT** This gets called as part of addPet, don't call it yourself please




## Pet

### getPetById(id : string) :Promise<IPet | undefined>
returns a pet with their owner and sitter populated


### addPet(newPet:IPet):Promise<IPet | undefined>
adds a pet to the db and returns new pet if successful.

newPet.name and newPet.owner fields are *required* and newPet.owner needs to be an ObjectId from a mongoose document - this function takes care of adding the pet to the User.




