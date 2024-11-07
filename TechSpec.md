In order to design this game in Javascript, the engine being used will by Babylon.js to replicate the 3-D design and physics necessary for the game.

The Game will follow the Shakespere play Twelfth night


## GameManager Class
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
ResetGame() : Resets the game back to the start.


## Scene Manager Class : Handles the changes between Scenes, quests, and levels of the game
# Variables
Collection of Level designs for the game, each one is a 3-d maze environment model

Collection of character Models
Models for each character you can play, Malvolio, Viola, Duke Orsino, and Olivia
Models for NPC characters Viola/Cesario (dual model), Sebastian, Orsino,Olivia, Maria, Sir Toby, Malvolio, Feste, Generic NPCs

# Methods
Next(Scene Scene): Transitions to next Scene based on the Story
ProgressStory(): Advances story state after level completion

## Player Controller Class: Handles the movement of characters in the environment as well as their interactions with the environment

# Variables
name string - Character’s name.
List<Item> inventory: Items that the player is holding/is in inventory
List<Strings> quotes: List of quotes the player can say
position: Vector3 - Player’s current position in the world.


# Methods
equipItem(item Item)
Behavior: Adds an item to the character's invetory.
Movement System: Input(key). Based on the key inputted, in this case arrow keys, makes the player move according to that arrow.

useSkill(item Item)
Behavior: Uses the held item in whatever function it has

Quote(key q)
When the q key is pressed, emits a random shakespeare quote

## NPC Class

# Variables
<List> Memory: List of player actions that the player did that dictates the NPC action
List <String>: Dialogue: Contains all dialogue options that can be triggered by the player in a certain level
Integer  RelationshipMeter: Integer that determines how good the bond is between player and this character. Is based on actions

# Methods
Walk() Pathfind through map and complete basic routines according to Story
React(reaction) React based on the input of the player and their actions when in the vicinity of the player. Changes relationship as well
NextDialogue(String PreviousDialogue, int RelationshipMeter ): Chooses the NextDialogue based on the RelationshipMeter level and previous dialogue


## Item Class
# Variables
position: Vector3 Position of item in the scene
String Name: Name of Item
String Type: Type of Item (Food, armour, Weapon, Key)
# Methods
Use() : Triggers item efffect, debuff, or other effect

Sound Class
# Variables
List: Sounds<List> List of Sound that can be played. Broken up into environment and player sounds
float newVolume: Volume of Sound played
# Methods
Play(Sound sound): Plays a sound
Stop (Sound sound): Stops the sound immediately
pause (Sound sound): Pauses sound playback
setVolume (float newVolume) Adjusts the sound volume


Scene Class
# Variables
name: string - Name of the scene 
objects: List<WorldObject> - List of interactable and static objects in the scene.
spawnPoints: List<Vector3> - List of spawn points for the player and NPCs.
backgroundMusic: Sound - Background music specific to this scene.
# Methods
loadScene(): Initializes the scene by loading objects and NPCs

unloadScene() Removes all objects and sounds, resetting the scene for future use.
spawnPlayer (Vector3 spawnPoint): Places the player at a specific spawn point within the scene.
addObject (WorldObject object) Adds an interactable object to the scene.
removeObject (WorldObject object): Removes a specified object from the scene

playSounds
Behavior: Plays background sounds 

