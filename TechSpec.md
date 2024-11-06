In order to design this game in Javascript, the engine being used will by Babylon.js to replicate the 3-D design and physics necessary for the game.

The Game will follow the Shakespere play Twelfth night


GameManager Class
# Variables
Player Name (String)
Chapter Number


# Methods
InitializeGame()
Sets up the story from the beginning, resetting all puzzles and levels
LoadMainMenu()
Loads the starting menu and ability to choose characters


Scene Manager Class : Handles the changes between Scenes, quests, and levels of the game
# Variables
Collection of Level designs for the game, each one is a 3-d maze environment model

Collection of character Models
Models for each character you can play, Malvolio, Viola, Duke Orsino, and Olivia

# Methods

Player Controller Class: Handles the movement of characters in the environment as well as their interactions with the environment

