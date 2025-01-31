window.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    const canvas = document.getElementById('renderCanvas');
    
    // Create the Babylon.js engine
    const engine = new BABYLON.Engine(canvas, true);

    // Create the scene
    function createScene() {
        const scene = new BABYLON.Scene(engine);
        
        // Camera setup
        const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 1.6, 0), scene);
        camera.attachControl(canvas, true);
        camera.speed = 0.2;
        camera.inertia = 0.7;
        camera.angularSensibility = 2000;
        
        // Light setup
        const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 3, 0), scene);
        light.intensity = 0.7;
        light.shadowEnabled = true;

        // Create room materials
        const wallMaterial = new BABYLON.StandardMaterial('wallMaterial', scene);
        wallMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        wallMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

        // Room dimensions
        const roomWidth = 10;
        const roomHeight = 4;
        const roomDepth = 10;

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

        // WASD movement
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
            const cameraSpeed = 0.1;
            if (inputMap["w"] || inputMap["W"]) {
                camera.position.addInPlace(camera.getDirection(BABYLON.Vector3.Forward()).scale(cameraSpeed));
            }
            if (inputMap["s"] || inputMap["S"]) {
                camera.position.addInPlace(camera.getDirection(BABYLON.Vector3.Forward()).scale(-cameraSpeed));
            }
            if (inputMap["a"] || inputMap["A"]) {
                camera.position.addInPlace(camera.getDirection(BABYLON.Vector3.Right()).scale(-cameraSpeed));
            }
            if (inputMap["d"] || inputMap["D"]) {
                camera.position.addInPlace(camera.getDirection(BABYLON.Vector3.Right()).scale(cameraSpeed));
            }
        });

        return scene;
    }

    // Create and run the scene
    const scene = createScene();
    engine.runRenderLoop(function() {
        scene.render();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        engine.resize();
    });
});
