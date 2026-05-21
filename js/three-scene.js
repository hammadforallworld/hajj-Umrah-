class SpiritualThreeScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.kaaba = null;
    this.clockTower = null;
    this.madinahGroup = null;
    this.airplane = null;
    this.particles = null;
    this.clouds = [];
    this.clock = new THREE.Clock();

    // Flight and camera control states
    this.targetCameraPos = { x: 0, y: 3, z: 12 };
    this.targetCameraLook = { x: 0, y: 1.5, z: 0 };
    this.currentCameraPos = { x: 0, y: 5, z: 15 };
    this.currentCameraLook = { x: 0, y: 0, z: 0 };

    this.init();
  }

  init() {
    // 1. Create Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0f1412, 0.015); // Luxurious dark teal/black fog

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(this.currentCameraPos.x, this.currentCameraPos.y, this.currentCameraPos.z);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Warm golden spiritual light representing the sun/divine glow
    this.dirLight = new THREE.DirectionalLight(0xffd700, 1.2);
    this.dirLight.position.set(10, 20, 10);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 0.5;
    this.dirLight.shadow.camera.far = 50;
    const d = 15;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.scene.add(this.dirLight);

    // Secondary soft cool sky light
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x1a2421, 0.6);
    this.scene.add(hemiLight);

    // Subtle colored point light focused on Kaaba
    const kaabaGlow = new THREE.PointLight(0xffdf7a, 1.5, 8);
    kaabaGlow.position.set(0, 1, 0);
    this.scene.add(kaabaGlow);

    // 3. Ground / Marble Courtyard (Haram floor)
    this.createCourtyard();

    // 4. Procedural 3D Kaaba
    this.createKaaba();

    // 5. Procedural 3D Clock Tower
    this.createClockTower();

    // 5b. Procedural 3D Madinah Group (Green Dome)
    this.createMadinahGroup();

    // 6. Procedural 3D Airplane
    this.createAirplane();

    // 7. Floating Gold Particles (Spiritual atmosphere)
    this.createGoldParticles();

    // 8. Fluffy Dynamic Clouds
    this.createClouds();

    // 9. Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // 10. Start Animation Loop
    this.animate();
  }

  createCourtyard() {
    // Large circular marble-like white floor
    const floorGeo = new THREE.RingGeometry(0, 45, 64);
    
    // Create detailed grid styling to simulate luxury marble tiles
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const ctx = floorCanvas.getContext('2d');
    ctx.fillStyle = '#fdfbf7'; // Cream white marble
    ctx.fillRect(0, 0, 512, 512);
    
    // Marble concentric rings
    ctx.strokeStyle = '#eadecc';
    ctx.lineWidth = 2;
    for (let r = 20; r < 512; r += 40) {
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Radial tiles lines
    ctx.lineWidth = 1;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 16) {
      ctx.beginPath();
      ctx.moveTo(256, 256);
      ctx.lineTo(256 + Math.cos(angle) * 300, 256 + Math.sin(angle) * 300);
      ctx.stroke();
    }

    const floorTexture = new THREE.CanvasTexture(floorCanvas);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.1,
      metalness: 0.1,
      bumpScale: 0.05
    });

    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  createKaaba() {
    const kWidth = 3.6;
    const kHeight = 4.2;
    const kDepth = 3.6;

    // Create a high-quality custom Canvas texture for the Kaaba walls (Kiswah with gold calligraphy)
    const wallCanvas = document.createElement('canvas');
    wallCanvas.width = 1024;
    wallCanvas.height = 1024;
    const ctx = wallCanvas.getContext('2d');

    // Base Kiswah (Elegant Charcoal/Black silk texture)
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle silk weaving vertical lines
    ctx.strokeStyle = '#181818';
    ctx.lineWidth = 3;
    for (let i = 0; i < 1024; i += 12) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();
    }

    // Golden Belt (Hizam) - placed at about 3/4 height
    const beltY = 240;
    const beltHeight = 90;

    // Outer gold border
    ctx.fillStyle = '#b8923a'; // Medium matte gold
    ctx.fillRect(0, beltY, 1024, beltHeight);

    // Inner bright gold patterns (simulated Arabic calligraphy)
    ctx.fillStyle = '#ffd700'; // Bright shiny gold
    ctx.fillRect(0, beltY + 12, 1024, beltHeight - 24);

    // Calligraphic squiggly lines inside the belt
    ctx.strokeStyle = '#6d5118';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 0; x < 1024; x += 30) {
      ctx.lineTo(x, beltY + 30 + Math.sin(x * 0.1) * 20);
      ctx.lineTo(x + 15, beltY + 60 + Math.cos(x * 0.1) * 15);
    }
    ctx.stroke();

    // Calligraphy border lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, beltY + 5, 1024, beltHeight - 10);
    ctx.strokeRect(0, beltY + 10, 1024, beltHeight - 20);

    // Individual hanging gold panels at the bottom of the belt
    for (let x = 40; x < 1024; x += 128) {
      ctx.fillStyle = '#b8923a';
      ctx.fillRect(x, beltY + beltHeight, 48, 50);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x + 4, beltY + beltHeight + 4, 40, 42);

      // Gold embroidery look inside panel
      ctx.fillStyle = '#6d5118';
      ctx.font = 'bold 20px serif';
      ctx.fillText('الله', x + 8, beltY + beltHeight + 30);
    }

    // Detail: Kaaba Golden Door (Bab Al-Kaaba) on one of the sides
    // We will place the door on the right side of the front texture. Let's make a specific texture canvas for the front side.
    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = 1024;
    frontCanvas.height = 1024;
    const fCtx = frontCanvas.getContext('2d');
    
    // Draw base front matching the wall
    fCtx.drawImage(wallCanvas, 0, 0);

    // Draw the gold Door (typically on the East wall, near the black stone corner)
    const doorX = 580;
    const doorY = 480;
    const doorW = 190;
    const doorH = 340;

    // Door Frame
    fCtx.fillStyle = '#8a6b22';
    fCtx.fillRect(doorX - 10, doorY - 10, doorW + 20, doorH + 20);

    // Door panels (Shiny gold)
    fCtx.fillStyle = '#ffd700';
    fCtx.fillRect(doorX, doorY, doorW, doorH);

    // Door details and borders
    fCtx.strokeStyle = '#6d5118';
    fCtx.lineWidth = 5;
    fCtx.strokeRect(doorX + 5, doorY + 5, doorW - 10, doorH - 10);
    fCtx.strokeRect(doorX + 15, doorY + 15, doorW - 30, doorH - 30);

    // Vertical split in door
    fCtx.beginPath();
    fCtx.moveTo(doorX + doorW / 2, doorY + 5);
    fCtx.lineTo(doorX + doorW / 2, doorY + doorH - 5);
    fCtx.stroke();

    // Calligraphy on the door (simulated)
    fCtx.fillStyle = '#47350f';
    fCtx.font = 'bold 18px Times New Roman';
    for (let line = 0; line < 7; line++) {
      fCtx.fillText('سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', doorX + 22, doorY + 50 + line * 42);
    }

    // Black Stone Corner (Hajar al-Aswad) - bottom right corner
    const stoneX = 850;
    const stoneY = 920;
    fCtx.fillStyle = '#c5b497'; // Silver casing
    fCtx.beginPath();
    fCtx.arc(stoneX, stoneY, 25, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.fillStyle = '#111111'; // The actual black stone
    fCtx.beginPath();
    fCtx.arc(stoneX, stoneY, 12, 0, Math.PI * 2);
    fCtx.fill();

    // Convert canvases to textures
    const standardTex = new THREE.CanvasTexture(wallCanvas);
    const frontTex = new THREE.CanvasTexture(frontCanvas);
    const roofTex = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.8 }); // Plain dark roof
    
    const materials = [
      new THREE.MeshStandardMaterial({ map: standardTex, roughness: 0.4 }), // Right
      new THREE.MeshStandardMaterial({ map: standardTex, roughness: 0.4 }), // Left
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 }), // Top (Roof)
      new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 }), // Bottom
      new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.4 }),    // Front
      new THREE.MeshStandardMaterial({ map: standardTex, roughness: 0.4 }), // Back
    ];

    const kaabaGeo = new THREE.BoxGeometry(kWidth, kHeight, kDepth);
    this.kaaba = new THREE.Mesh(kaabaGeo, materials);
    this.kaaba.position.set(0, kHeight / 2, 0);
    this.kaaba.castShadow = true;
    this.kaaba.receiveShadow = true;
    this.scene.add(this.kaaba);

    // Outer glass boundary around Kaaba representing the Shadarwan
    const shadarwanGeo = new THREE.BoxGeometry(kWidth + 0.3, 0.15, kDepth + 0.3);
    const shadarwanMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf5,
      roughness: 0.1,
      metalness: 0.2
    });
    const shadarwan = new THREE.Mesh(shadarwanGeo, shadarwanMat);
    shadarwan.position.set(0, 0.075, 0);
    shadarwan.receiveShadow = true;
    this.scene.add(shadarwan);
  }

  createClockTower() {
    // Stylized luxury Makkah Clock Tower in the background
    this.clockTower = new THREE.Group();

    // Main base body
    const baseGeo = new THREE.BoxGeometry(3, 14, 3);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x272a29,
      roughness: 0.8,
      metalness: 0.4
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 7;
    this.clockTower.add(base);

    // Upper tower structure (smaller)
    const upperGeo = new THREE.BoxGeometry(2, 6, 2);
    const upper = new THREE.Mesh(upperGeo, baseMat);
    upper.position.y = 17;
    this.clockTower.add(upper);

    // Spire
    const spireGeo = new THREE.ConeGeometry(0.8, 5, 4);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0xcda052, // Gold
      metalness: 0.8,
      roughness: 0.2
    });
    const spire = new THREE.Mesh(spireGeo, spireMat);
    spire.position.y = 22;
    this.clockTower.add(spire);

    // Golden Crescent on top
    const ringGeo = new THREE.TorusGeometry(0.5, 0.1, 8, 24, Math.PI * 1.5);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const crescent = new THREE.Mesh(ringGeo, ringMat);
    crescent.position.y = 24.8;
    crescent.rotation.y = Math.PI / 2;
    this.clockTower.add(crescent);

    // Glowing Clock Faces on 4 sides of the upper tower
    const clockFaceGeo = new THREE.BoxGeometry(1.6, 1.6, 2.05); // slightly wider to pop out of sides
    const clockFaceMat = new THREE.MeshStandardMaterial({
      color: 0xeaffd0,
      emissive: 0x39ff14,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });
    const clockFaceX = new THREE.Mesh(clockFaceGeo, clockFaceMat);
    clockFaceX.position.y = 17;
    this.clockTower.add(clockFaceX);

    const clockFaceGeoZ = new THREE.BoxGeometry(2.05, 1.6, 1.6);
    const clockFaceZ = new THREE.Mesh(clockFaceGeoZ, clockFaceMat);
    clockFaceZ.position.y = 17;
    this.clockTower.add(clockFaceZ);

    // Place the clock tower way back and offset
    this.clockTower.position.set(-8, 0, -22);
    this.scene.add(this.clockTower);
  }

  createMadinahGroup() {
    this.madinahGroup = new THREE.Group();

    // 1. White/Cream Cylindrical Base
    const baseGeo = new THREE.CylinderGeometry(1.8, 1.8, 2.2, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.5,
      metalness: 0.1
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 1.1;
    base.castShadow = true;
    base.receiveShadow = true;
    this.madinahGroup.add(base);

    // Decorative arches around the base to act as windows
    const archMat = new THREE.MeshStandardMaterial({ color: 0x1f1b18, roughness: 0.9 });
    const archGeo = new THREE.BoxGeometry(0.2, 0.5, 0.05);
    for (let i = 0; i < 16; i++) {
      const arch = new THREE.Mesh(archGeo, archMat);
      const angle = (i / 16) * Math.PI * 2;
      const radius = 1.82; // slightly outside base cylinder
      arch.position.set(Math.cos(angle) * radius, 1.4, Math.sin(angle) * radius);
      arch.rotation.y = -angle + Math.PI / 2;
      this.madinahGroup.add(arch);
    }

    // 2. The Bulbous Green Dome (Gumbad-e-Khizra)
    const domeGeo = new THREE.SphereGeometry(1.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x0c4a2a, // Rich emerald green
      roughness: 0.25,
      metalness: 0.3
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 2.2;
    dome.scale.set(1, 1.3, 1);
    dome.castShadow = true;
    this.madinahGroup.add(dome);

    // 3. Spire (Crescent + Post) on top of Green Dome
    const spireGroup = new THREE.Group();
    spireGroup.position.set(0, 4.4, 0);

    const spirePostGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0xffd700, // Shiny gold
      metalness: 0.9,
      roughness: 0.1
    });
    const spirePost = new THREE.Mesh(spirePostGeo, spireMat);
    spireGroup.add(spirePost);

    for (let j = 0; j < 3; j++) {
      const orbGeo = new THREE.SphereGeometry(0.12 - j * 0.03, 12, 12);
      const orb = new THREE.Mesh(orbGeo, spireMat);
      orb.position.y = -0.2 + j * 0.18;
      spireGroup.add(orb);
    }

    const crescentGeo = new THREE.TorusGeometry(0.12, 0.03, 8, 16, Math.PI * 1.4);
    const crescent = new THREE.Mesh(crescentGeo, spireMat);
    crescent.position.y = 0.45;
    crescent.rotation.y = Math.PI / 2;
    crescent.rotation.z = Math.PI / 4;
    spireGroup.add(crescent);

    this.madinahGroup.add(spireGroup);

    // 4. White Mosque Minaret next to Green Dome
    const minaret = new THREE.Group();
    minaret.position.set(4, 0, -2); // offset to the side

    const minBaseGeo = new THREE.BoxGeometry(1.2, 5, 1.2);
    const minBase = new THREE.Mesh(minBaseGeo, baseMat);
    minBase.position.y = 2.5;
    minBase.castShadow = true;
    minBase.receiveShadow = true;
    minaret.add(minBase);

    const minShaftGeo = new THREE.CylinderGeometry(0.45, 0.45, 6, 8);
    const minShaft = new THREE.Mesh(minShaftGeo, baseMat);
    minShaft.position.y = 8;
    minShaft.castShadow = true;
    minShaft.receiveShadow = true;
    minaret.add(minShaft);

    const balconyGeo = new THREE.CylinderGeometry(0.7, 0.6, 0.4, 8);
    const balcony = new THREE.Mesh(balconyGeo, baseMat);
    balcony.position.y = 11;
    minaret.add(balcony);

    const minSpireGeo = new THREE.ConeGeometry(0.4, 2, 8);
    const minSpireMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    });
    const minSpire = new THREE.Mesh(minSpireGeo, minSpireMat);
    minSpire.position.y = 12.2;
    minaret.add(minSpire);

    const tipGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const tip = new THREE.Mesh(tipGeo, spireMat);
    tip.position.y = 13.45;
    minaret.add(tip);

    const minCrescent = new THREE.Mesh(crescentGeo, spireMat);
    minCrescent.position.y = 13.7;
    minCrescent.rotation.y = Math.PI / 2;
    minaret.add(minCrescent);

    this.madinahGroup.add(minaret);

    // Set initial position of Madinah Group: hidden below ground
    this.madinahGroup.position.set(0, -12, 0);
    this.madinahGroup.visible = false;
    this.scene.add(this.madinahGroup);
  }

  set3DSceneMode(mode) {
    if (!this.kaaba || !this.clockTower || !this.madinahGroup) return;

    if (mode === 'madinah') {
      // Transition Makkah out
      gsap.to(this.kaaba.position, { y: -6, duration: 1.2, ease: "power2.inOut" });
      gsap.to(this.clockTower.position, { y: -30, duration: 1.2, ease: "power2.inOut" });
      
      // Slide Madinah in
      this.madinahGroup.visible = true;
      gsap.to(this.madinahGroup.position, { y: 0, duration: 1.2, ease: "power2.inOut" });
    } else {
      // Transition Madinah out
      gsap.to(this.madinahGroup.position, { y: -12, duration: 1.2, ease: "power2.inOut", onComplete: () => {
        this.madinahGroup.visible = false;
      }});
      
      // Slide Makkah in
      gsap.to(this.kaaba.position, { y: 2.1, duration: 1.2, ease: "power2.inOut" });
      gsap.to(this.clockTower.position, { y: 0, duration: 1.2, ease: "power2.inOut" });
    }
  }

  createAirplane() {
    this.airplane = new THREE.Group();

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5, // Glossy white fuselage
      roughness: 0.1,
      metalness: 0.1
    });
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd, // Matte silver wings
      roughness: 0.3,
      metalness: 0.5
    });
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x006633, // Saudia/Emirates green trim
      roughness: 0.2,
      metalness: 0.3
    });

    // Fuselage (body)
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.3, 3, 16);
    bodyGeo.rotateX(Math.PI / 2); // align forward-backward
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    this.airplane.add(body);

    // Cockpit nose (cone)
    const noseGeo = new THREE.ConeGeometry(0.3, 0.6, 16);
    noseGeo.rotateX(Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, bodyMat);
    nose.position.z = 1.8;
    this.airplane.add(nose);

    // Main wings
    const wingsGeo = new THREE.BoxGeometry(4.5, 0.05, 0.8);
    // Skew the wings back slightly
    wingsGeo.translate(0, 0, -0.2);
    const wings = new THREE.Mesh(wingsGeo, wingMat);
    wings.position.set(0, 0, 0.3);
    this.airplane.add(wings);

    // Tail fin (vertical stabilizer)
    const tailGeo = new THREE.BoxGeometry(0.05, 0.9, 0.6);
    const tail = new THREE.Mesh(tailGeo, trimMat);
    tail.position.set(0, 0.45, -1.2);
    this.airplane.add(tail);

    // Horizontal tail stabilizers
    const tailStabGeo = new THREE.BoxGeometry(1.4, 0.04, 0.4);
    const tailStab = new THREE.Mesh(tailStabGeo, wingMat);
    tailStab.position.set(0, 0, -1.2);
    this.airplane.add(tailStab);

    // Jet Engines (2 engines under the wings)
    const engineGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 8);
    engineGeo.rotateX(Math.PI / 2);
    
    const engineL = new THREE.Mesh(engineGeo, trimMat);
    engineL.position.set(-1.0, -0.15, 0.4);
    this.airplane.add(engineL);

    const engineR = new THREE.Mesh(engineGeo, trimMat);
    engineR.position.set(1.0, -0.15, 0.4);
    this.airplane.add(engineR);

    // Set initial position out of view or high in the air
    this.airplane.position.set(25, 12, -15);
    this.airplane.scale.set(0.6, 0.6, 0.6);
    this.airplane.rotation.set(0, -Math.PI / 4, 0.1);
    this.scene.add(this.airplane);
  }

  createGoldParticles() {
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const waveOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a cylinder around the center (Kaaba area)
      const r = 2.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.random() * 18; // y height
      positions[i * 3 + 2] = Math.sin(theta) * r;

      waveOffsets[i] = Math.random() * Math.PI * 2; // offset for waving motion
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Glowing golden particle texture using a Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 220, 100, 1)');
    grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
    grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.35,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.particles.waveOffsets = waveOffsets;
    this.scene.add(this.particles);
  }

  createClouds() {
    const cloudGeo = new THREE.DodecahedronGeometry(1, 1);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.05,
      transparent: true,
      opacity: 0.45
    });

    for (let i = 0; i < 8; i++) {
      const cloudGroup = new THREE.Group();
      const numPuffs = 3 + Math.floor(Math.random() * 4);
      
      for (let j = 0; j < numPuffs; j++) {
        const puff = new THREE.Mesh(cloudGeo, cloudMat);
        const scale = 1.0 + Math.random() * 1.5;
        puff.scale.set(scale * 1.5, scale, scale);
        puff.position.set(
          j * 1.2 - (numPuffs / 2),
          Math.sin(j) * 0.4,
          (Math.random() - 0.5) * 0.8
        );
        cloudGroup.add(puff);
      }

      cloudGroup.position.set(
        -25 + Math.random() * 50,
        10 + Math.random() * 8,
        -15 + Math.random() * 10
      );
      
      this.clouds.push({
        mesh: cloudGroup,
        speed: 0.01 + Math.random() * 0.02
      });

      this.scene.add(cloudGroup);
    }
  }

  // API to trigger plane flying across screen
  triggerPlaneFlight() {
    if (!this.airplane) return;

    // Reset plane position to start from left side
    this.airplane.position.set(-30, 8, -5);
    this.airplane.rotation.set(0, Math.PI / 2, -0.2); // Pointing right and tilting up

    // Animate plane across the sky using GSAP
    gsap.to(this.airplane.position, {
      x: 30,
      y: 14,
      z: -15,
      duration: 5.5,
      ease: "power1.inOut",
      onUpdate: () => {
        // Add subtle waving rotation
        this.airplane.rotation.z = -0.2 + Math.sin(this.airplane.position.x * 0.1) * 0.1;
      }
    });
  }

  // Smoothly adjust camera coordinates based on current active view
  setCameraView(viewName) {
    // Determine scene mode: Makkah or Madinah
    let sceneMode = 'makkah';
    if (viewName === 'umrah-packages' || viewName === 'gallery' || viewName === 'hotels' || viewName === 'about') {
      sceneMode = 'madinah';
    }
    this.set3DSceneMode(sceneMode);

    switch (viewName) {
      case 'home':
        this.targetCameraPos = { x: 0, y: 3.5, z: 10 };
        this.targetCameraLook = { x: 0, y: 1.8, z: 0 };
        break;
      case 'hajj-packages':
        this.targetCameraPos = { x: 4.5, y: 5.5, z: 8.5 };
        this.targetCameraLook = { x: -0.5, y: 2.0, z: -1 };
        break;
      case 'umrah-packages':
        // Focus on Green Dome
        this.targetCameraPos = { x: -3.5, y: 4.5, z: 7.5 };
        this.targetCameraLook = { x: 0.5, y: 2.2, z: -1 };
        break;
      case 'gallery':
        this.targetCameraPos = { x: 0, y: 6.0, z: 10.0 };
        this.targetCameraLook = { x: 0, y: 2.0, z: 0 };
        break;
      case 'flights':
        this.targetCameraPos = { x: 0, y: 8, z: 16 };
        this.targetCameraLook = { x: 0, y: 2, z: -5 };
        this.triggerPlaneFlight(); // Auto trigger flight when entering flights page!
        break;
      case 'hotels':
        if (sceneMode === 'madinah') {
          this.targetCameraPos = { x: 5, y: 7, z: 8 };
          this.targetCameraLook = { x: 4, y: 6, z: -2 };
        } else {
          this.targetCameraPos = { x: -6, y: 9, z: -16 };
          this.targetCameraLook = { x: -8, y: 5, z: -22 };
        }
        break;
      case 'booking':
        this.targetCameraPos = { x: 2, y: 1.5, z: 4.5 };
        this.targetCameraLook = { x: 0, y: 1.6, z: 0 }; // close up on Kaaba
        break;
      default:
        // Default overview
        this.targetCameraPos = { x: 0, y: 5, z: 14 };
        this.targetCameraLook = { x: 0, y: 1.5, z: 0 };
        break;
    }
  }

  onMouseMove(event) {
    // Parallax adjustment based on mouse coordinates
    const mouseX = (event.clientX / window.innerWidth) - 0.5;
    const mouseY = (event.clientY / window.innerHeight) - 0.5;

    // Apply soft offsets to camera targets
    this.targetCameraPos.x += mouseX * 0.05;
    this.targetCameraPos.y += mouseY * -0.05;
  }

  onWindowResize() {
    const width = this.canvas.parentNode.clientWidth;
    const height = this.canvas.parentNode.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height, false);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Slow rotation of Kaaba
    if (this.kaaba) {
      this.kaaba.rotation.y = elapsedTime * 0.06;
      // Gentle floating animation
      this.kaaba.position.y = 2.1 + Math.sin(elapsedTime * 0.6) * 0.04;
    }

    // 2. Animate gold dust particles
    if (this.particles) {
      const posAttr = this.particles.geometry.attributes.position;
      const count = posAttr.count;
      const offsets = this.particles.waveOffsets;

      for (let i = 0; i < count; i++) {
        // Let them rise
        let y = posAttr.getY(i);
        y += 0.015;
        if (y > 18) y = 0; // wrap around
        posAttr.setY(i, y);

        // Add floating wave motion (x and z offsets)
        const offset = offsets[i];
        let x = posAttr.getX(i);
        let z = posAttr.getZ(i);

        x += Math.sin(elapsedTime + offset) * 0.005;
        z += Math.cos(elapsedTime + offset) * 0.005;

        posAttr.setX(i, x);
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }

    // 3. Move Clouds slowly across background
    this.clouds.forEach(cloud => {
      cloud.mesh.position.x += cloud.speed;
      if (cloud.mesh.position.x > 32) {
        cloud.mesh.position.x = -32;
        cloud.mesh.position.y = 10 + Math.random() * 8;
      }
    });

    // 4. Smooth Camera Interpolation (LERP)
    this.currentCameraPos.x += (this.targetCameraPos.x - this.currentCameraPos.x) * 0.05;
    this.currentCameraPos.y += (this.targetCameraPos.y - this.currentCameraPos.y) * 0.05;
    this.currentCameraPos.z += (this.targetCameraPos.z - this.currentCameraPos.z) * 0.05;

    this.currentCameraLook.x += (this.targetCameraLook.x - this.currentCameraLook.x) * 0.05;
    this.currentCameraLook.y += (this.targetCameraLook.y - this.currentCameraLook.y) * 0.05;
    this.currentCameraLook.z += (this.targetCameraLook.z - this.currentCameraLook.z) * 0.05;

    this.camera.position.set(this.currentCameraPos.x, this.currentCameraPos.y, this.currentCameraPos.z);
    this.camera.lookAt(this.currentCameraLook.x, this.currentCameraLook.y, this.currentCameraLook.z);

    this.renderer.render(this.scene, this.camera);
  }
}

// Attach class to window
window.SpiritualThreeScene = SpiritualThreeScene;
