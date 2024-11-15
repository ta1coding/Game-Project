### GameManager Class
**Priority:** P0  
**Implementation Timeline:** Day 1

**Core Requirements:**
- All methods and variables except quest tracking, pausing, and player level

**Technical Components:**
- `InitializeGame()` method to set up the initial game state.
- `LoadLevel()` method to load levels according to `storyState`.
- Variables:`character`, `currentScene`, `playingStage`, `storyState`.

**Simplifications:**
- Don't make pause, questtaken, and player level

**Dependencies:**
- **SceneManager Class** for setting up and transitioning between scenes.
- **Player Class** for initializing and managing the player character.

---

### SceneManager Class
**Priority:** P0  
**Implementation Timeline:** Day 1-2

**Core Requirements:**
- NPC and player functionality

**Technical Components:**
- `SetUpScene()` method to set up items, NPCs, player, background music, and geometry.
- `InitializePlayers()` to place the player character at the starting point.
- `ProgressStory()` to update `storyState` upon level completion.

**Simplifications:**
- Use placeholder assets for models and environments in the initial build.
- No need for items

**Dependencies:**
- **GameManager Class** for accessing the current `storyState`.
- **NPC Class** and **Item Class** for placing NPCs and items in the scene.
- **Scene Class** for detailed scene configurations.

---

### Player Class
**Priority:** P0  
**Implementation Timeline:** Day 1-2

**Core Requirements:**
- Enable player movement and interaction with the environment.
- Handle collision detection to interact with the world.
- Initiate dialogues with NPCs.

**Technical Components:**
- `MovementSystem(inputKey)` for player movement controls.
- `checkCollision(position)` to detect interactions with the environment.
- `initiateDialogue(npcId: string)` to start conversations with NPCs.
- Variables: `name`,  `position`, `quests`, `mode`.

**Simplifications:**
- No inventory yet
- Limit movement to basic directions without advanced physics initially.

**Dependencies:**
- **Dialogue Class** for managing conversations.
- **NPC Class** for interaction targets.
- **Item Class** for inventory items.

---

### NPC Class
**Priority:** P0  
**Implementation Timeline:** Day 1-2

**Core Requirements:**
- Provide NPC movement and basic behaviors within the scene.
- Manage dialogue flow and reactions based on player interactions.
- Allow NPCs to speak and progress the story.

**Technical Components:**
- `NextDialogue()` to update dialogue options after interactions.
- `Speak(dialogue: string)` to communicate with the player.
- Variables: `dialogue`, `relationshipMeter`, `position`, `model`.

**Simplifications:**
- NPC can be static and have one dialogue option

**Dependencies:**
- **Dialogue Class** for dialogue content and management.
- **SceneManager Class** for NPC placement and initialization.
- **Player Class** for interaction triggers.

---

### Dialogue Class
**Priority:** P0
**Implementation Timeline:** Day 2

**Core Requirements:**
- Only hold text 

**Technical Components:**
 - Only Dialogue string

**Simplifications:**
- Get rid of any relationship

**Dependencies:**
- **NPC Class** and **Player Class** for dialogue initiation and progression.
- **Quest Class** if dialogues trigger or update quests.

---

### Scene Class
**Priority:** P0  
**Implementation Timeline:** Day 2

**Core Requirements:**
- Define the structure and elements of each game scene.
- Specify NPC spawn points, item locations, and player starting point.

**Technical Components:**
- Variables: `npcSpawnPoints`, `startingPoint`,  `sceneNumber`, 
- Data structures to hold positions and scene-specific configurations.

**Simplifications:**
- Use simple scene layouts with minimal environmental complexity.
- Get rid of music and items

**Dependencies:**
- **SceneManager Class** for scene setup and transitions.
- **NPC Class** and **Item Class** for populating the scene with characters and objects.

---

### Item Class
**Priority:** P2  
**Implementation Timeline:** Day 3

**Core Requirements:**
- Represent items within the game world.
- Enable items to be used by the player to trigger effects or progress.

**Technical Components:**
- `Use()` method to activate the item's effect.
- Variables: `position`, `name`, `type`.

**Simplifications:**
- Limit item types to a few categories (e.g., keys, generic collectibles).
- Simplify item effects to basic actions like unlocking a door or triggering dialogue.

**Dependencies:**
- **Player Class** for item interactions and inventory management.
- **SceneManager Class** for item placement within scenes.

---

### Quest Class
**Priority:** P1 
**Implementation Timeline:** Day 8

**Core Requirements:**
- Manage quests to provide objectives and enhance the storyline.
- Track quest progress and completion status.

**Technical Components:**
- Methods: `startQuest()`, `progressQuest()`, `resetQuest()`.
- Variables: `completed`, `progress`, `title`, `startingLocation`, `objectives`.

**Simplifications:**
- Focus on one quest
- Simplify objectives to straightforward tasks like talking to one NPC

**Dependencies:**
- **Objective Class** for detailed quest tasks.
- **Player Class** to track quest acceptance and progress.

---

### Objective Class
**Priority:** P1  
**Implementation Timeline:** Day 3

**Core Requirements:**
- Make some very clear and simple task for the player to complete. Just get one down

**Technical Components:**
- Methods: `complete()`, `checkCompletion()`, `resetObjective()`.
- Variables: `description`, `isComplete`, `location`, `requiredItem`.

**Simplifications:**
- Limit objectives to simple actions like reaching a location or obtaining an item.
- Exclude complex conditions or multi-step objectives initially.

**Dependencies:**
- **Quest Class** as part of the quest's objectives list.
- **Item Class** if certain items are required for completion.


Day 1-2 (Core Framework)
GameManager Class

Priority: P0
Implementation Timeline: Day 1-2
Core Requirements:

Initialize the game state.
Load levels based on the current story state.
Technical Components:

InitializeGame() method to set up the initial game state.
LoadLevel() method to load levels according to storyState.
Variables: character, currentScene, playingStage, storyState.
Simplifications:

Exclude quest tracking, pausing functionality, and player level management for MVP.
Dependencies:

SceneManager Class for setting up and transitioning between scenes.
Player Class for initializing and managing the player character.
SceneManager Class

Priority: P0
Implementation Timeline: Day 1-2
Core Requirements:

Handle scene setup and transitions.
Manage story progression based on level completion.
Technical Components:

SetUpScene() method to initialize scenes with necessary components.
InitializePlayers() to place the player character at the starting point.
ProgressStory() to update storyState upon level completion.
Variables: Collection of level designs, character models, NPC spawn points.
Simplifications:

Use placeholder assets for models and environments.
Exclude item placement in scenes for MVP.
Dependencies:

GameManager Class for accessing and updating the storyState.
NPC Class for placing NPCs within scenes.
Scene Class for detailed scene configurations.
Player Class

Priority: P0
Implementation Timeline: Day 1-2
Core Requirements:

Enable player movement and interaction with the environment.
Handle collision detection.
Initiate dialogues with NPCs.
Technical Components:

MovementSystem(inputKey) for handling player movement based on input.
checkCollision(position) to detect interactions with the environment.
initiateDialogue(npcId: string) to start conversations with NPCs.
Variables: name, position, quests, mode.
Simplifications:

Omit the inventory system initially.
Limit movement to basic directions without advanced physics.
Dependencies:

Dialogue Class for managing conversations.
NPC Class for interaction targets.
NPC Class

Priority: P0
Implementation Timeline: Day 1-2
Core Requirements:

Provide NPC interactions and dialogues.
Manage basic NPC behaviors within scenes.
Technical Components:

NextDialogue() to update dialogue options after interactions.
Speak(dialogue: string) to communicate with the player.
Variables: dialogue, relationshipMeter, position, model.
Simplifications:

NPCs remain static with a single dialogue option for MVP.
Dependencies:

Dialogue Class for dialogue content and management.
SceneManager Class for NPC placement within scenes.
Player Class for triggering interactions.
Day 3-4 (Essential Features)
Dialogue Class

Priority: P0
Implementation Timeline: Day 3-4
Core Requirements:

Manage dialogue strings for interactions between the player and NPCs.
Technical Components:

Store and retrieve dialogue text.
Simplifications:

Exclude relationship dynamics and effects on dialogues.
Use text-based dialogues without branching options.
Dependencies:

NPC Class and Player Class for initiating and managing dialogues.
Scene Class

Priority: P0
Implementation Timeline: Day 3-4
Core Requirements:

Define the structure and elements of each game scene.
Specify NPC spawn points and player starting locations.
Technical Components:

Variables: npcSpawnPoints, startingPoint, sceneNumber.
Data structures to hold positions and scene-specific configurations.
Simplifications:

Utilize simple scene layouts with minimal environmental complexity.
Exclude background music and item placements for MVP.
Dependencies:

SceneManager Class for scene setup and transitions.
NPC Class for populating scenes with characters.
Day 5 (Enhancement & Testing)
Quest Class

Priority: P1
Implementation Timeline: Day 5
Core Requirements:

Manage quests to provide objectives and enhance the storyline.
Track quest progress and completion status.
Technical Components:

startQuest() to initiate quests.
progressQuest() to advance quest stages.
resetQuest() to reset quest progress.
Variables: completed, progress, title, startingLocation, objectives.
Simplifications:

Focus on implementing a single main quest.
Simplify objectives to straightforward tasks, such as talking to one NPC.
Dependencies:

Objective Class for defining specific quest tasks.
Player Class to track quest acceptance and progress.
Objective Class

Priority: P1
Implementation Timeline: Day 5
Core Requirements:

Define specific tasks within quests that the player must complete.
Monitor objective completion and reset status as needed.
Technical Components:

complete() to mark the objective as complete.
checkCompletion() to verify if objective conditions are met.
resetObjective() to reset the objective for replayability.
Variables: description, isComplete, location, requiredItem.
Simplifications:

Limit objectives to simple actions like reaching a location or obtaining an item.
Exclude complex conditions or multi-step objectives initially.
Dependencies:

Quest Class as part of the quest's objectives list.
Item Class if certain items are required for completion.
Final Testing and Refinement

Conduct comprehensive testing of all implemented P0 and P1 features.
Identify and resolve any bugs in core functionalities.
Optimize performance to ensure smooth gameplay.
Refine interactions and ensure all dependencies function correctly.