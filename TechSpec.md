In order to design this game in Javascript, the engine being used will by Babylon.js to replicate the 3-D design and physics necessary for the game.

The Game will follow the Shakespere play Twelfth night


## GameManager Class
# Variables
playerLevel: int - Tracks the player’s current level.
character - Active character the player is using
CurrentScene: Current Scene value based on a double variable
PlayingStage: Boolean about whether game is paused or not
StoryState: Current progress in the story


# Methods
InitializeGame()
Sets up the story from the beginning, resetting all puzzles and levels
LoadMainMenu()
Loads the starting menu and ability to choose characters
LoadLevel():Calls SetUpScene for the Scene the player is on based on the storyState variable. 
ResetGame() : Resets the game back to the start.
Pause(): Pauses the Game


## Scene Manager Class : Handles the changes between Scenes, quests, and levels of the game
# Variables
Collection of Level designs for the game, each one is a 3-d maze environment model

Collection of character Models
Models for each character you can play, Malvolio, Viola, Duke Orsino, and Olivia
Models for NPC characters Viola/Cesario (dual model), Sebastian, Orsino,Olivia, Maria, Sir Toby, Malvolio, Feste, Generic NPCs

Items(): List of items with item name and position as a value pair. It denotes all the items needed for the scene and their corresponding spawn locations

# Methods
PlaceItems:Puts the corresponding item at the location in the Items list
PlaceNPCs:Places the appropriate NPCs at NPC spawnpoints and triggers their idle walking
InitalizePlayers:Places character at startPoint in the level
playMusic:Plays the background music on loop
ProgressStory(): If the level is completed, advances the story variable by the appropriate act or scene
SetUpScene: Places items, NPCs, initializes player, starts the background sound, and initializes geometry from the currentScene

## Player Class: 

# Variables
name string - Character’s name.
List<Item> inventory: Items that the player is holding/is in inventory
List<Strings> quotes: List of quotes the player can say
quests: List<String> - List of quests the player has undertaken.
quotes List<String> of quotes the player can say
position: Vector3 - Player’s current position in the world.
TalkingTo: Name of NPC player is talking to
Dialogue: List of dialogues possible that the player can say
Mode: Model of the Players character


# Methods
equipItem(item Item)
Behavior: adds item to inventory, if the inventory is full, doesn’t do anything and pops up message saying “Inventory full”
checkCollision(position): Checks if the players position is in the location of any geometry of the level. Returns true or false
Movement System: Input(key). Based on the key inputted, in this case arrow keys, makes the player move according to that arrow.
initiateDialogue(npcId: string):starts dialogue with NPC, updates NPC you are talking to.
updateRelationship(npcId: string, value: number): Updates the NPC who you are talking to’s relationship bar by the effect level of the dialogue
useItem (Item)
Behavior: Uses the held item in whatever function it has

Quote(key q)
When the q key is pressed, emits a random shakespeare quote

## NPC Class

# Variables
<List> Reaction: List of character gestures the NPC can perform based on dialogue
List <String>: Dialogue: Contains all dialogue options that can be triggered by the player in a certain level
Integer  RelationshipMeter: Integer that determines how good the bond is between player and this character. Is based on actions
position: 3d vector showing Position of NPC in the scene
Model: Model of the NPC 

# Methods
Walk() Pathfind through map and complete basic routines according to Story
React(reaction) React based on the list of reactions
NextDialogue(): updates list of dialogue options after relationshipStatus is updated

Speak(String Dialogue): speaks to the Player


## Item Class
# Variables
position: Vector3 Position of item in the scene
String Name: Name of Item
String Type: Type of Item (Food, armour, Weapon, Key)
# Methods
Use() : Triggers item efffect, debuff, or other effect

## Dialogue Class

# Variables
effect level: int dicating how much the dialogue will increase/decrease relationship level
Dialogue: The actualDialogue
RelationshipRequirement: The integer required for an NPC to speak this line as dialogue. If the relationship level is below this requirement, this dialogue will not be spoken


## Quest Class
# Variables
Boolean completed: Is the Quest completed or Not
Double Progress: % of Quest completed
String title: Name of Quest
3d vector startingLocation: position in scene where quest can be initiated
objectives: List<Objective> - List of specific objectives to complete the quest.

# Methods
startQuest(): starts the quest
resetQuest(): resets the quest
progressQuest(): progresses to next objective

## Objective class
# Variables
description: string - Brief description of the task.
isComplete: boolean - Tracks whether the objective is completed.
location: Vector3 - Specific location associated with the objective (e.g., find an item at a certain spot).
requiredItem: Item - An item required to complete the objective, if applicable.

# Methods
complete
Behavior: Marks the objective as complete.
checkCompletion
Output: boolean - Returns true if the objective conditions are met.
resetObjective
Behavior: Resets the objective status for replayability.


## Scene Class
# Variables
NPC spawnpoint: List of 3d vectors telling places where NPCS are spawned in
StartingPoint: 3d vector which is the position where the player starts in the level
ItemPoints: List of 3d Vectors which is Places where items are placed in the level 
Items: List of all items meant to be placed in Scene
Scene Number: Double dictating Act and Scene number specific to this scene
backgroundMusic: background music meant to play in the level.

