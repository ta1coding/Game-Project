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

            // Movement
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