# Codedamn Projects - Tic Tac Toe (Multiplayer)
![main image](https://raw.githubusercontent.com/codedamn-projects/Tic-Tac-Toe-Multiplayer/master/designs/cover-image.png)


This is one of the many projects available on [codedamn](https://codedamn.com/projects) to reinforce your learning by building. If you want to become a full stack developer and learn by practicing, feel free to attempt this challenge. Feel free to check out the codedamn [Full Stack Web Development Learning Path](https://codedamn.com/learning-paths/fullstack) to learn more about how to become an awesome full stack developer.


## Instructions

Your challenge is to build out this project and get it looking as close to the design as possible.

You can use **any tools or technologies** you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.
 
You can get the complete idea of the project from checking out the `game-play.gif` from the `/designs` folder.
### Landing Page 
The landing page will be shown in the `/` route. 
This page should have the buttons to start and join a game. 
The maximum number of players is 2. So there can only exist two connections to the  web socket (from player1 - server & player2 - server)

![home page](https://raw.githubusercontent.com/codedamn-projects/Tic-Tac-Toe-Multiplayer/master/designs/Landing%20Page%20%5BDesktop%5D.png)


### Start New
On clicking `Start New` the user is prompted to enter his name. On submitting a random room code is generated. The player-1 has to share the room code with player-2 to join the game. 

![name prompt](https://raw.githubusercontent.com/codedamn-projects/Tic-Tac-Toe-Multiplayer/master/designs/Player%201%20-%20Details.png)

On clicking on `Let's Go` the user is prompted to copy the room code and share it with player-2

![room code prompt](https://raw.githubusercontent.com/codedamn-projects/Tic-Tac-Toe-Multiplayer/master/designs/Player%201%20-%20Prompt.png)

### Join Game
Player 2 is supposed to join the game by clicking on `Join Game` the player-2 is prompted to Enter his name along with the room code

![Join Game for player 2](https://raw.githubusercontent.com/codedamn-projects/Tic-Tac-Toe-Multiplayer/master/designs/Player%202%20-%20Join%20Prompt.png)

## Backend Tasks

1. Creating a new room id when a new users starts a new game 
2. Temporarily storing the value in a file or in a object
3. Creating a web socket using socket.io (Reference : [Server API](https://socket.io/docs/v4/server-api/) & [Client API](https://socket.io/docs/v4/client-api/))
4. Making sure the socket connection is working properly
5. On completing the game and if a user clicks on `Play Again` button, the game data should be reset. 
### Ports 
The Codedamn Playgrounds exposes only `1337` and `1338` ports on the internet. So you'll be using `localhost` for connecting to the mongodb instance as they are hosted on the same docker container. You can specify it as `localhost:27017` or simple write `localhost`. 


Want some support on the challenge? [Join our discord community](https://cdm.sh/discord) and ask questions in the **#general** channel.

There is no limit you can go beyond the mentioned criteria and create additional functionalities

## Recommended Technologies 

1. Socket.io for web sockets
2. Tailwind CSS for User Interface

## Where to find everything

Your task is to build out the project as per the provided screenshots. You will find both a mobile and a desktop version of the design.

The designs are in image formats can be found in `/designs`.

You will find all the required required images in the `/public` folder

## Send feedback!

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please visit [codedamn feedback page](https://codedamn.com/contact)