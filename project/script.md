# Script

{scene: https://www.pexels.com/video/woman-and-dog-on-a-couch-time-lapse-4685370/}

Oh no! Looks like you need to go to coding bootcamp! But who is going to look after your furry baby while you're away?
You want a smooth experience finding someone trustworthy and a way to keep in touch and get updates regularly while you're away!

{scene: big fluffy cat}

Or are you a professional pet sitter, but you hate having to keep track of all your client paperwork and
managing your calendar is a mess?

{scene: person with pile of paperwork,
calendar: https://www.pexels.com/video/desk-office-pen-women-6172655/}

Well, we made something for both of you:
## CADO:
the app that brings pet owners and pet sitters together!

{scene: people walking a happy dog}

Finding a great sitter near you is easy: once you make a profile and add your pet's information,

{phone: CADO welcome screen}

you can search for pet sitters near you and read all about them.

{phone: scrolls list of sitters}

Find someone that looks great? Just tap to open a real time chat to get the conversation started!

{real time chat: sends message, 'Hi, can you look after my dog between March 15th and 31st? He's very friendly but has to take medication every day}

{scene in split screen: someone picks up a phone}
{phone screen: new message notification}

{real time chat reply arrives: 'Of course! I'm trained in dog first aid and have loads of experience with older dogs!}

{phone screen: new stay flow}

Once they confirm, you're good to go! They'll send you updates through the chat so you can go and study with total peace of mind,

{scene: someone picks up their phone, looks at it and smiles}

and if anything happens, they have all your pets information, including your vet details, in the palm of their hand
{phone: pet info dialog}

but don't worry - probably they will just be out there having a wonderful time
{scene: https://www.pexels.com/video/two-dogs-walking-in-a-forest-5382500/}

{phone screen: picture of happy dog, then message 'he's having a great time'}


Then all you have to do is count the day until you're reunited with your fluffy best friend!

{scene: https://www.pexels.com/video/a-woman-petting-her-cat-on-the-bed-6865078/}




# TECH STACK

CADO is a full-stack in NextJS and Typescript, all the way through. Staying aware the client / server boundary can be a little daunting, but the ability to write React components that directly interact with our controllers makes up for it. Similarly, Typescript can be a lot of work sometimes but it makes up for it by providing safety and reliability.

On the frontend, ShadCN with Tailwind powers our UI with amazing customiseable components, with React Icons for a little extra spice.

On the backend, we use a MongoDB Atlas cloud instance supported by mongoose to manage our user (and pet) data, Clerk handles our user signup and authentication, with the Map Maker api to find distances. We leverage Socket.io to manage our real-time chat, and finally, Jest powers our test suite integrated in a CI / CD pipeline in Github.

A shout-out as well to our design stack - we couldn't have done it without excalidraw and figma, and Pexels and pixabay for all this amazing pet footage.

### funny youtube ad ideas:

Use this one weird trick to keep your client / server boundary hydrated!

Help!! maximum call stack size exceeded??

Grandmother discovers AMAZING trick to handle merge conflicts!

'Next.js is a frustrating, opinionated mess'?? MY RESPONSE

Updating your mongoose schema with new fields: 10 common issues

Come to the woods with me to collect TYPESCRIPT MUSHROOMS

