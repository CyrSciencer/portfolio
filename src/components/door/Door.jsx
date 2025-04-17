import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import styles from "./Door.module.css"; // Import the CSS module

// Accept modelColor prop with a default value (e.g., white)
const Door = ({
  modelColor = "#ffffff",
  onPressing = () => {
    console.log("Button pressed");
  },
}) => {
  // --- Refs --- //
  const mountRef = useRef(null);
  const modelRef = useRef();
  const mixerRef = useRef();
  const openingActionRef = useRef();
  const closingActionRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const animationFrameIdRef = useRef();

  // --- Constants --- //
  const FADE_DURATION = 0.3;
  const CAMERA_Y_OFFSET = -1; // <<< Added vertical offset for the camera
  const RESOLUTION_FACTOR = 4; // <<< Lower resolution factor (e.g., 2 = half res, 4 = quarter res)

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- 1. Core Three.js Setup --- //
    const scene = new THREE.Scene();

    // Calculate initial low resolution dimensions
    const initialWidth = currentMount.clientWidth;
    const initialHeight = currentMount.clientHeight;
    const lowResWidth = Math.floor(initialWidth / RESOLUTION_FACTOR);
    const lowResHeight = Math.floor(initialHeight / RESOLUTION_FACTOR);

    const camera = new THREE.PerspectiveCamera(
      75,
      lowResWidth / lowResHeight, // Aspect ratio based on low resolution
      0.1,
      1000
    );
    cameraRef.current = camera;

    // --- Renderer Setup (Modified for Transparency & 32-bit Style & Low Res) ---
    const renderer = new THREE.WebGLRenderer({
      antialias: false, // <<< Set to false for pixelated look
      alpha: true, // <<< Add alpha: true for transparency
    });
    renderer.setClearColor(0x000000, 0); // <<< Set clear color with 0 alpha
    // Set DRAWING BUFFER size to low resolution, but DON'T update style
    renderer.setSize(lowResWidth, lowResHeight, false);
    renderer.physicallyCorrectLights = false; // <<< Disabled for simpler, retro lighting
    // Keep devicePixelRatio for potential use, though low-res might dominate
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    rendererRef.current = renderer;

    // Apply styles to the CANVAS element for upscaling
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.imageRendering = "pixelated";
    // Optional: Add vendor prefixes if needed for older browsers
    // canvas.style.imageRendering = '-moz-crisp-edges';
    // canvas.style.imageRendering = '-webkit-optimize-contrast';

    // --- 2. Lighting Setup --- //
    // Keep original light setup for now, but physicallyCorrectLights=false will change behavior
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Reverted to default white
    directionalLight.position.set(15, 15, -15);
    scene.add(directionalLight);

    // --- 3. Model & Animation Loading --- //
    const loader = new GLTFLoader();
    loader.load(
      "/models/door.glb",
      (gltf) => {
        console.log("GLTF loaded successfully:", gltf);
        modelRef.current = gltf.scene;

        // --- Apply 32-bit Style Material ---
        if (modelRef.current) {
          console.log(
            `Applying 32-bit style material (Lambert, flat, nearest)`
          );
          modelRef.current.traverse((object) => {
            if (object.isMesh && object.material) {
              const apply32BitStyle = (originalMaterial) => {
                const newMaterial = new THREE.MeshLambertMaterial();

                // Copy essential properties
                if (originalMaterial.color) {
                  newMaterial.color.copy(originalMaterial.color);
                }
                if (originalMaterial.map) {
                  newMaterial.map = originalMaterial.map;
                  // Apply Nearest Filter for pixelated textures
                  newMaterial.map.magFilter = THREE.NearestFilter;
                  newMaterial.map.minFilter = THREE.NearestFilter;
                  newMaterial.map.needsUpdate = true;
                  console.log(
                    "Applied NearestFilter to map on new Lambert material:",
                    originalMaterial.name || "Unnamed Original"
                  );
                }

                // Apply custom color prop override
                newMaterial.color.set(modelColor);

                // Apply flat shading
                newMaterial.flatShading = true;
                newMaterial.needsUpdate = true; // Might not be strictly needed for flatShading but good practice

                return newMaterial;
              };

              // Replace material(s)
              if (Array.isArray(object.material)) {
                object.material = object.material.map(apply32BitStyle);
              } else {
                object.material = apply32BitStyle(object.material);
              }
            }
          });
        }
        // --- END: Apply 32-bit Style Material ---

        scene.add(modelRef.current); // Add model AFTER applying material

        // --- ADDED: Adjust Camera to Fit Model --- //
        // Camera setup remains mostly the same, aspect ratio is handled
        const box = new THREE.Box3().setFromObject(modelRef.current);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Calculate the maximum dimension of the model
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180); // FOV in radians
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        // Add a slight buffer/padding
        cameraZ *= 1.55; // Adjust multiplier for more/less padding

        // Position camera looking at the center, offset along X, and add Y offset
        camera.position.set(
          center.x + cameraZ,
          center.y + CAMERA_Y_OFFSET,
          center.z
        );
        // Make the camera look at a point also offset by CAMERA_Y_OFFSET on the Y axis
        const lookAtTarget = new THREE.Vector3(
          center.x,
          center.y + CAMERA_Y_OFFSET,
          center.z
        );
        camera.lookAt(lookAtTarget);
        console.log(
          "Camera adjusted to fit model (X/Y offset, adjusted lookAt):",
          {
            center,
            lookAtTarget, // Log the new target
            size,
            cameraPosition: camera.position,
            offsetY: CAMERA_Y_OFFSET,
          }
        );
        // --- END: Adjust Camera --- //

        // Setup Animations (ensure clampWhenFinished = true)
        if (gltf.animations && gltf.animations.length > 0) {
          console.log("Animations found:", gltf.animations);
          mixerRef.current = new THREE.AnimationMixer(modelRef.current);

          const openingClip = THREE.AnimationClip.findByName(
            gltf.animations,
            "opening"
          );
          const closingClip = THREE.AnimationClip.findByName(
            gltf.animations,
            "closing"
          );

          if (openingClip) {
            openingActionRef.current = mixerRef.current.clipAction(openingClip);
            console.log(`Opening action created: ${openingClip.name}`);
            openingActionRef.current.loop = THREE.LoopOnce;
            openingActionRef.current.clampWhenFinished = true;
          } else {
            console.warn("Could not find animation named 'opening'!");
          }

          if (closingClip) {
            closingActionRef.current = mixerRef.current.clipAction(closingClip);
            console.log(`Closing action created: ${closingClip.name}`);
            closingActionRef.current.loop = THREE.LoopOnce;
            closingActionRef.current.clampWhenFinished = true;
          } else {
            console.warn("Could not find animation named 'closing'!");
          }
        } else {
          console.log("No animations found in the model.");
        }
      },
      (xhr) => {
        console.log(`${((xhr.loaded / xhr.total) * 100).toFixed(2)}% loaded`);
      },
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );

    // --- 4. Interaction (mouseenter/mouseleave on DIV with Crossfade) --- //
    const handleMouseEnter = () => {
      console.log("Div Mouse Enter - Fade to Opening");
      const openingAction = openingActionRef.current;
      const closingAction = closingActionRef.current;

      if (openingAction) {
        openingAction.reset();
        openingAction.setEffectiveWeight(1);
        openingAction.fadeIn(FADE_DURATION).play();
      }
      if (closingAction) {
        closingAction.fadeOut(FADE_DURATION);
      }
    };

    const handleMouseLeave = () => {
      console.log("Div Mouse Leave - Fade to Closing");
      const openingAction = openingActionRef.current;
      const closingAction = closingActionRef.current;

      if (closingAction) {
        closingAction.reset();
        closingAction.setEffectiveWeight(1);
        closingAction.fadeIn(FADE_DURATION).play();
      }
      if (openingAction) {
        openingAction.fadeOut(FADE_DURATION);
      }
    };

    // --- 5. Animation Loop --- //
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
    };

    // --- 6. Resize Handling --- //
    const handleResize = () => {
      if (currentMount && cameraRef.current && rendererRef.current) {
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;

        // Calculate new low resolution
        const newLowResWidth = Math.floor(width / RESOLUTION_FACTOR);
        const newLowResHeight = Math.floor(height / RESOLUTION_FACTOR);

        // Update camera aspect ratio based on low resolution
        cameraRef.current.aspect = newLowResWidth / newLowResHeight;
        cameraRef.current.updateProjectionMatrix();

        // Update renderer drawing buffer size, DON'T update style
        rendererRef.current.setSize(newLowResWidth, newLowResHeight, false);
        // Keep devicePixelRatio if needed
        // rendererRef.current.setPixelRatio(window.devicePixelRatio);
      }
    };

    // --- 7. Initial Setup & Event Listeners --- //
    currentMount.appendChild(canvas); // Append the styled canvas
    // const canvasElement = renderer.domElement; // Already got canvas above
    // Add mouseenter/mouseleave listeners to the container div
    currentMount.addEventListener("mouseenter", handleMouseEnter);
    currentMount.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);
    animate(); // Start the animation loop (mixer will update, but no actions playing by default)

    // --- 8. Cleanup Function --- //
    return () => {
      console.log("Cleanup: Starting");

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        console.log("Cleanup: Animation frame cancelled");
      }

      // Remove listeners
      window.removeEventListener("resize", handleResize);
      if (currentMount) {
        // Ensure mount point still exists for cleanup
        currentMount.removeEventListener("mouseenter", handleMouseEnter);
        currentMount.removeEventListener("mouseleave", handleMouseLeave);
        console.log("Cleanup: Mouse listeners removed from div");
      }

      if (modelRef.current) {
        if (scene) scene.remove(modelRef.current);
        modelRef.current.traverse((object) => {
          if (object.isMesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              // Make sure to dispose the *replaced* materials
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => {
                  if (material.map) material.map.dispose(); // Dispose texture if we own it
                  material.dispose();
                });
              } else {
                if (object.material.map) object.material.map.dispose(); // Dispose texture if we own it
                object.material.dispose();
              }
            }
          }
        });
        console.log("Cleanup: Model disposed (including replaced materials)");
      }
      modelRef.current = null;
      mixerRef.current = null;
      openingActionRef.current = null;
      closingActionRef.current = null;

      // --- Reverted Light Cleanup ---
      if (ambientLight) ambientLight.dispose();
      if (directionalLight) directionalLight.dispose();
      console.log("Cleanup: Lights disposed");

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (currentMount && rendererRef.current.domElement) {
          try {
            // Use the 'canvas' variable captured earlier for removal
            currentMount.removeChild(canvas);
          } catch (error) {
            console.error(
              "Cleanup Error removing renderer DOM element:",
              error
            );
          }
        }
        console.log("Cleanup: Renderer disposed");
      }
      rendererRef.current = null;
      cameraRef.current = null;

      console.log("Cleanup: Complete");
    };
    // Update dependency array to include the factor if it were state/prop
    // }, [modelColor, RESOLUTION_FACTOR]);
  }, []); // Keep empty for now as factor is const

  // --- Effect to Update Color on Prop Change ---
  useEffect(() => {
    // Only run if the model is loaded and color prop changes
    if (modelRef.current && modelColor) {
      console.log(`Updating model color to: ${modelColor} (Lambert)`);
      modelRef.current.traverse((object) => {
        if (object.isMesh && object.material) {
          const updateMaterialColor = (material) => {
            // Check if material is Lambert and has color property
            if (material.isMeshLambertMaterial && material.color) {
              material.color.set(modelColor);
            }
            // Texture filters are set at load time, no need to update here
          };
          // Handle both single material and array of materials
          if (Array.isArray(object.material)) {
            object.material.forEach(updateMaterialColor);
          } else {
            updateMaterialColor(object.material);
          }
        }
      });
    }
  }, [modelColor]); // Depend only on modelColor
  // --- END: Effect to Update Color ---

  return (
    <div ref={mountRef} className={styles.container} onClick={onPressing} />
  );
};

export default Door;
