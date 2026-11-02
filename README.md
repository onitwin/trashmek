# Trashmek
## Purpose
Discord bot to provide useful features for a local wargaming club. Features include :
* Dice roller
* Directions to club
* Payment Details
* Terrain Layouts for a given Tournament
* Upcoming events


## Approach
Using Discord.js, I used their scaffolding for initial page (the page that runs the requested actions), then broke each action into separate 'slash' functions with narrow scope. Most functionality was call/response, but the terrain layouts required additional input from the user to determine what to return. All functions except the dice rolling where returned only to the end user, to avoid polluting the chat. 

## How to Run
You will first need to set up a developer profile on [Discord Developer Portal](https://discord.com/developers/applications)

1. Follow the guide at [Discord.js](https://discordjs.guide/legacy/preparations/app-setup) to set up your bot
2. Clone app from repository
* Run the following commands

```
git clone git@github.com:onitwin/trashmek.git
npm install
npm run dev
```
3. Navigate to top level of the cloned code. Create a page for environmental variables titled **.env** (I used .env npm package to disseminate these values to the rest of the code). Create using : `touch .env`   
4. Create variables for :
* `CLIENT_TOKEN` (This is the app token obtained from the Bot set up process listed at **step 1**)
* `GUILD_ID` (Obtained by right-clicking the guild/server ID on the Discord app)
* `CLIENT_ID` (The bots own token)
5. You need to tell the server which commands are available. To do this run the following command:
  `node deploy-commands.js`
6. Finally, run your bot:
  `node index.js`

## Images
Slash Command list | Example Return | Button Press Return
:---: | :---: | :---:
<img src="https://github.com/onitwin/imagehost/blob/main/slashList.jpg" alt="slash command list" width="200" height="200" border="10" /></img>| <img src="https://github.com/onitwin/imagehost/blob/main/slashResult.jpg" alt="example slash result" width="200" height="200" border="10" /></img> | <img src="https://github.com/onitwin/imagehost/blob/main/buttonResult.jpg" alt="example button result" width="200" height="200" border="10" /></img>
