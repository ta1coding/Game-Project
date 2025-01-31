window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    function createScene() {
        const scene = new BABYLON.Scene(engine);
        
        // Camera setup
        const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 2, 0), scene);
        camera.attachControl(canvas, true);
        camera.speed = 0.3;
        camera.inertia = 0.7;
        camera.angularSensibility = 2000;
        
        // Light setup
        const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 5, 0), scene);
        light.intensity = 0.8;
        light.shadowEnabled = true;

        // Create room materials
        const wallMaterial = new BABYLON.StandardMaterial('wallMaterial', scene);
        wallMaterial.diffuseColor = new BABYLON.Color3(0.85, 0.85, 0.85);
        wallMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

        // Room dimensions (much larger)
        const roomWidth = 100;
        const roomHeight = 20;
        const roomDepth = 100;

        // Create room walls
        const walls = [
            // Floor
            BABYLON.MeshBuilder.CreateBox('floor', {
                width: roomWidth,
                height: 0.1,
                depth: roomDepth
            }, scene),
            // Ceiling
            BABYLON.MeshBuilder.CreateBox('ceiling', {
                width: roomWidth,
                height: 0.1,
                depth: roomDepth
            }, scene),
            // Back wall
            BABYLON.MeshBuilder.CreateBox('backWall', {
                width: roomWidth,
                height: roomHeight,
                depth: 0.1
            }, scene),
            // Front wall
            BABYLON.MeshBuilder.CreateBox('frontWall', {
                width: roomWidth,
                height: roomHeight,
                depth: 0.1
            }, scene),
            // Left wall
            BABYLON.MeshBuilder.CreateBox('leftWall', {
                width: 0.1,
                height: roomHeight,
                depth: roomDepth
            }, scene),
            // Right wall
            BABYLON.MeshBuilder.CreateBox('rightWall', {
                width: 0.1,
                height: roomHeight,
                depth: roomDepth
            }, scene)
        ];

        // Position walls
        walls[0].position.y = -roomHeight/2; // Floor
        walls[1].position.y = roomHeight/2;  // Ceiling
        walls[2].position.z = -roomDepth/2;  // Back wall
        walls[3].position.z = roomDepth/2;   // Front wall
        walls[4].position.x = -roomWidth/2;  // Left wall
        walls[5].position.x = roomWidth/2;   // Right wall

        // Apply materials and enable shadows
        walls.forEach(wall => {
            wall.material = wallMaterial;
            wall.receiveShadows = true;
        });

        // Shadow generator
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        walls.forEach(wall => shadowGenerator.addShadowCaster(wall));

        // Create NPC placeholder box
        const npcBox = BABYLON.MeshBuilder.CreateBox('npc', {
            width: 2,
            height: 4,
            depth: 2
        }, scene);
        npcBox.position = new BABYLON.Vector3(0, 2, 0);
        
        const npcMaterial = new BABYLON.StandardMaterial('npcMaterial', scene);
        npcMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.8);
        npcBox.material = npcMaterial;

        // Declare dialogText in scene scope
        let dialogText;
        let advancedTexture;
        let isShowingDialog = false;

        // Add quotes array at top of createScene
        const quotes = [
            "All the world's a stage, and all the men and women merely players.",
            "To be, or not to be, that is the question.",
            "What's in a name? That which we call a rose by any other name would smell as sweet.",
            "If music be the food of love, play on."
        ];

        // Update dialog creation

            advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            
            const textBackground = new BABYLON.GUI.Rectangle("textBackground");
            textBackground.width = "600px";
            textBackground.height = "100px";
            textBackground.cornerRadius = 20;
            textBackground.color = "white";
            textBackground.thickness = 2;
            textBackground.background = "black";
            textBackground.alpha = 0.7;
            textBackground.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            textBackground.top = "-50px";
            textBackground.isVisible = false;
            advancedTexture.addControl(textBackground);
            
            dialogText = new BABYLON.GUI.TextBlock("dialogText");
            dialogText.text = "test";  // Start empty
            dialogText.color = "white";
            dialogText.fontSize = 24;
            dialogText.fontFamily = "Arial";
            dialogText.textWrapping = true;
            dialogText.width = "550px";
            dialogText.height = "80px";
            dialogText.isVisible = true
            textBackground.addControl(dialogText);

            const toggleDialog = (show) => {
                if (show) {
                    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                    dialogText.text = randomQuote;
                    textBackground.isVisible = true;
                    dialogText.isVisible = true;
                    isShowingDialog = true;
                } else {
                    // dialogText.text = "";
                    textBackground.isVisible = false;
                    isShowingDialog = false;
                }
            };

            // Update dialog toggle logic
            scene.onKeyboardObservable.add((kbInfo) => {
                if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN && 
                    kbInfo.event.key.toLowerCase() === 'e') {
                    const distance = BABYLON.Vector3.Distance(camera.position, npcBox.position);
                    
                    if (distance <= 20) {
                        toggleDialog(!isShowingDialog);
                    }
                }
            });

            // // Update distance check
            // scene.onBeforeRenderObservable.add(() => {
            //     const distance = BABYLON.Vector3.Distance(camera.position, npcBox.position);
            //     if (distance > 5 && isShowingDialog) {
            //         toggleDialog(false);
            //     }
            // });

        
        
        // Input handling
        const inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
            }
        ));

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
            }
        ));

        // Before render
        scene.onBeforeRenderObservable.add(() => {
            const cameraSpeed = 0.15;
            const rotationSpeed = 0.03;
            const fixedHeight = 2; // Lock camera at this height

            // Movement
            if (inputMap["w"] || inputMap["W"]) {
                const forward = camera.getDirection(BABYLON.Vector3.Forward());
                forward.y = 0; // Remove vertical component
                forward.normalize();
                camera.position.addInPlace(forward.scale(cameraSpeed));
            }
            if (inputMap["s"] || inputMap["S"]) {
                const backward = camera.getDirection(BABYLON.Vector3.Forward());
                backward.y = 0; // Remove vertical component
                backward.normalize();
                camera.position.addInPlace(backward.scale(-cameraSpeed));
            }
            if (inputMap["a"] || inputMap["A"]) {
                const left = camera.getDirection(BABYLON.Vector3.Right());
                left.y = 0; // Remove vertical component
                left.normalize();
                camera.position.addInPlace(left.scale(-cameraSpeed));
            }
            if (inputMap["d"] || inputMap["D"]) {
                const right = camera.getDirection(BABYLON.Vector3.Right());
                right.y = 0; // Remove vertical component
                right.normalize();
                camera.position.addInPlace(right.scale(cameraSpeed));
            }

            // Force camera height to remain constant
            camera.position.y = fixedHeight;

            // View rotation with arrow keys
            if (inputMap["ArrowLeft"]) {
                camera.rotation.y -= rotationSpeed;
            }
            if (inputMap["ArrowRight"]) {
                camera.rotation.y += rotationSpeed;
            }
            if (inputMap["ArrowUp"]) {
                camera.rotation.x -= rotationSpeed;
            }
            if (inputMap["ArrowDown"]) {
                camera.rotation.x += rotationSpeed;
            }

            const distance = BABYLON.Vector3.Distance(camera.position, npcBox.position);
            
            if (distance > 5 && isShowingDialog && dialogText) {
                dialogText.text = "";
                dialogText.isVisible = false;
                isShowingDialog = false;
                console.log("Player moved away, hiding dialog");
            }
            
            if (inputMap["e"] || inputMap["E"]) {
                if (distance <= 5) {
                    if (!isShowingDialog) {
                        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                        dialogText.text = randomQuote;
                        isShowingDialog = true;
                    } else {
                        dialogText.text = "";
                        isShowingDialog = false;
                    }
                }
                // Clear the key press
                inputMap["e"] = false;
                inputMap["E"] = false;
            }
        });

        return scene;
    }

    const scene = createScene();
    
    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
});