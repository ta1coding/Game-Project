In order to design this game in Javascript, the engine being used will by Babylon.js to replicate the 3-D design and physics necessary for the game.

The Game will follow the Shakespere play Twelfth night


GameManager Class
# Variables
playerLevel: int - Tracks the player’s current level.
haracter - Active character the player is using
inventory: List<Item> - List of items in the players inventoru.
quests: List<Quest> - List of quests the player has undertaken.
worldState: Progress or instance of the world
Story: Current progress in the story


# Methods
InitializeGame()
Sets up the story from the beginning, resetting all puzzles and levels
LoadMainMenu()
Loads the starting menu and ability to choose characters
startQuest(Quest quest) Adds a new quest to the player's active quests.


Scene Manager Class : Handles the changes between Scenes, quests, and levels of the game
# Variables
Collection of Level designs for the game, each one is a 3-d maze environment model

Collection of character Models
Models for each character you can play, Malvolio, Viola, Duke Orsino, and Olivia
Models for NPC characters Viola/Cesario (dual model), Sebastian, Orsino,Olivia, Maria, Sir Toby, Malvolio, Feste, Generic NPCs

# Methods

Player Controller Class: Handles the movement of characters in the environment as well as their interactions with the environment

# Variables
name string - Character’s name.
List<Item> inventory: Items that the player is holding/is in inventory
List<Strings> quotes: List of quotes the player can say


# Methods
equipItem(item Item)
Behavior: Adds an item to the character's invetory.
Movement System: Input(key). Based on the key inputted, in this case arrow keys, makes the player move according to that arrow.

useSkill(item Item)
Behavior: Uses the held item in whatever function it has

Quote(key q)
When the q key is pressed, emits a random shakespeare quote

NPC Class

# Variables
<List> Memory: List of player actions that the player did that dictates the NPC action
Integer Relationship Meter: Integer that determines how good the bond is between player and this character. Is based on actions

# Methods
Walk() Pathfind through map and complete basic routines according to Story
React(reaction) React based on the input of the player and their actions when in the vicinity of the player. Changes relationship as well

