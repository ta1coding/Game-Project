// Ensure Babylon.js and Babylon.js GUI libraries are included in your HTML file:
// <script src="https://cdn.babylonjs.com/babylon.js"></script>
// <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>

// Get the canvas element
var canvas = document.getElementById("renderCanvas");

// Generate the Babylon 3D engine
var engine = new BABYLON.Engine(canvas, true);

// Create the scene
var scene = new BABYLON.Scene(engine);

// Add a camera to the scene and attach it to the canvas
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2, -10), scene);
camera.setTarget(BABYLON.Vector3.Zero());
camera.attachControl(canvas, true);

// Add a light to the scene
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

// Add a ground to the scene
var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: 10, height: 10}, scene);

// GameManager Class
class GameManager {
    constructor() {
        this.character = null; // Active player character
        this.currentScene = null; // Current scene ID or object
        this.playingStage = false; // Game state: playing or paused
        this.storyState = 0; // Variable to track story progression
    }

    InitializeGame() {
        // Reset variables for replayability
        this.playingStage = true;
        this.storyState = 0;
        this.LoadLevel();
    }

    LoadLevel() {
        // Load the current level based on storyState
        var sceneManager = new SceneManager();
        sceneManager.SetUpScene();
        sceneManager.InitializePlayers();

        this.character = sceneManager.player; // Get the player character
        this.currentScene = sceneManager.scene; // Get the current scene

        // Begin the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Start player movement and interaction
        this.character.MovementSystem();
        this.character.initiateDialogue();
    }
}

// SceneManager Class
class SceneManager {
    constructor() {
        this.npcSpawnPoints = [new BABYLON.Vector3(2, 0, 2)]; // Example NPC spawn points
        this.startingPoint = new BABYLON.Vector3(0, 0, 0); // Player starting position
        this.player = null;
        this.npcList = [];
    }

    SetUpScene() {
        // Place NPCs and items
        // For simplicity, create one NPC
        var dialogue = new Dialogue();
        var npcPosition = this.npcSpawnPoints[0];
        var npc = new NPC(npcPosition, dialogue.getRandomDialogue());
        this.npcList.push(npc);
    }

    InitializePlayers() {
        // Place the player at the starting point
        this.player = new Player(this.startingPoint);
        this.player.attachCamera(camera);
        this.player.npcList = this.npcList; // Give player access to NPCs in the scene
    }
}

// Player Class
class Player {
    constructor(startingPosition) {
        // Create the player mesh
        this.mesh = BABYLON.MeshBuilder.CreateBox("player", {size: 1}, scene);
        this.mesh.position = startingPosition;
        this.position = this.mesh.position;
        this.TalkingTo = null;
        this.speed = 0.1;
        this.npcList = [];
    }

    attachCamera(camera) {
        // Parent the camera to the player mesh
        camera.parent = this.mesh;
    }

    MovementSystem() {
        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            function(evt) {
                inputMap[evt.sourceEvent.key.toLowerCase()] = evt.sourceEvent.type == "keydown";
            }
        ));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function(evt) {
                inputMap[evt.sourceEvent.key.toLowerCase()] = evt.sourceEvent.type == "keydown";
            }
        ));

        scene.onBeforeRenderObservable.add(() => {
            // Movement
            if (inputMap["w"]) {
                this.mesh.moveWithCollisions(this.mesh.forward.scale(this.speed));
            }
            if (inputMap["s"]) {
                this.mesh.moveWithCollisions(this.mesh.forward.scale(-this.speed));
            }
            if (inputMap["a"]) {
                this.mesh.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
            }
            if (inputMap["d"]) {
                this.mesh.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
            }
        });
    }

    initiateDialogue() {
        // Check for nearby NPCs and start dialogue
        var _this = this;
        window.addEventListener("keydown", function(event) {
            if (event.key.toLowerCase() === "e") {
                // Check for NPCs within interaction range
                _this.npcList.forEach(function(npc) {
                    var distance = BABYLON.Vector3.Distance(_this.mesh.position, npc.mesh.position);
                    if (distance < 2) {
                        npc.Speak();
                        npc.React();
                    }
                });
            }
        });
    }
}

// NPC Class
class NPC {
    constructor(position, dialogue) {
        // Create NPC mesh
        this.mesh = BABYLON.MeshBuilder.CreateBox("npc", {size: 1}, scene);
        this.mesh.position = position;
        this.position = this.mesh.position;
        this.dialogue = dialogue;

        // Give the NPC a different color
        var npcMaterial = new BABYLON.StandardMaterial("npcMat", scene);
        npcMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
        this.mesh.material = npcMaterial;
    }

    Speak() {
        // Display dialogue
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var dialogueText = new BABYLON.GUI.TextBlock();
        dialogueText.text = this.dialogue;
        dialogueText.color = "white";
        dialogueText.fontSize = 24;
        dialogueText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        dialogueText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(dialogueText);

        // Remove dialogue after a few seconds
        setTimeout(function() {
            advancedTexture.removeControl(dialogueText);
        }, 3000);
    }

    React() {
        // Simple reaction: NPC rotates
        this.mesh.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
    }
}

// Dialogue Class
class Dialogue {
    constructor() {
        this.dialogueLines = [
            "If music be the food of love, play on.",
            "Better a witty fool than a foolish wit.",
            "Some are born great, some achieve greatness, and some have greatness thrust upon them."
        ];
    }

    getRandomDialogue() {
        var index = Math.floor(Math.random() * this.dialogueLines.length);
        return this.dialogueLines[index];
    }
}

// Start the game
var gameManager = new GameManager();
gameManager.InitializeGame();

// Resize the engine when the window is resized
window.addEventListener("resize", function () {
    engine.resize();
});
