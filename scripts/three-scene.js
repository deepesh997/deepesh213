/* ==========================================================================
   DEEPESH KUMAR JAIN - 3D THREE.JS WEBGL ENGINE
   Holographic AI Neural Core, Orbiting Agent Nodes & Camera Choreography
   ========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

class PortfolioScene {
  constructor() {
    this.container = document.getElementById('webgl-canvas-container');
    this.canvas = document.getElementById('three-canvas');
    if (!this.canvas) return;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.interactiveMode = false;
    this.clock = new THREE.Clock();
    
    // Mouse tracking with interpolation
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.raycaster = new THREE.Raycaster();
    this.mouseCoords = new THREE.Vector2(-10, -10);
    this.hoveredNode = null;
    
    // Section camera targets
    this.scrollProgress = 0;
    this.cameraPositions = [
      { pos: new THREE.Vector3(0, 0, 9), look: new THREE.Vector3(0, 0, 0) },        // Hero
      { pos: new THREE.Vector3(3.5, 1.2, 7.5), look: new THREE.Vector3(0, 0, 0) },  // Architecture
      { pos: new THREE.Vector3(-4, -0.8, 8), look: new THREE.Vector3(0, 0, 0) },    // Simulator
      { pos: new THREE.Vector3(2.8, -2, 7.2), look: new THREE.Vector3(0, 0, 0) },   // Agents
      { pos: new THREE.Vector3(-3, 1.5, 8.5), look: new THREE.Vector3(0, 0, 0) },   // Joule Catalog
      { pos: new THREE.Vector3(0, 3, 9), look: new THREE.Vector3(0, 0, 0) },         // Timeline
      { pos: new THREE.Vector3(0, 0, 8), look: new THREE.Vector3(0, 0, 0) }          // Contact
    ];

    try {
      this.initScene();
      this.initLights();
      this.buildNeuralCore();
      this.buildOrbitRings();
      this.buildAgentNodes();
      this.buildParticleField();
      this.buildDataGrid();
      this.initControls();
      this.bindEvents();
      this.animate();
    } catch (err) {
      console.warn('WebGL initialization fallback:', err);
      if (this.container) this.container.style.display = 'none';
    }
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050814, 0.045);

    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 0, 9);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0x0e1738, 1.2);
    this.scene.add(ambient);

    // Cyan key light
    this.lightCyan = new THREE.PointLight(0x00f2fe, 3, 20);
    this.lightCyan.position.set(5, 4, 6);
    this.scene.add(this.lightCyan);

    // Violet fill light
    this.lightViolet = new THREE.PointLight(0x8b5cf6, 3.5, 22);
    this.lightViolet.position.set(-6, -3, 5);
    this.scene.add(this.lightViolet);

    // SAP Joule warm amber rim light
    this.lightAmber = new THREE.PointLight(0xf59e0b, 2.5, 18);
    this.lightAmber.position.set(0, -5, 4);
    this.scene.add(this.lightAmber);
  }

  buildNeuralCore() {
    this.coreGroup = new THREE.Group();

    // Inner glowing energy sphere
    const innerGeo = new THREE.SphereGeometry(1.05, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: false,
      transparent: true,
      opacity: 0.22
    });
    this.innerCore = new THREE.Mesh(innerGeo, innerMat);
    this.coreGroup.add(this.innerCore);

    // Middle glowing Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x3b0764,
      emissiveIntensity: 0.5
    });
    this.icoMesh = new THREE.Mesh(icoGeo, icoMat);
    this.coreGroup.add(this.icoMesh);

    // Outer crystalline faceted cage
    const outerGeo = new THREE.DodecahedronGeometry(1.7, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 1.0,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4
    });
    this.outerMesh = new THREE.Mesh(outerGeo, outerMat);
    this.coreGroup.add(this.outerMesh);

    this.scene.add(this.coreGroup);
  }

  buildOrbitRings() {
    this.ringsGroup = new THREE.Group();

    const ringParams = [
      { radius: 2.6, tube: 0.012, color: 0x00f2fe, rotX: Math.PI / 3, rotY: 0.2 },
      { radius: 3.3, tube: 0.014, color: 0xf59e0b, rotX: -Math.PI / 4, rotY: Math.PI / 6 },
      { radius: 4.1, tube: 0.012, color: 0x8b5cf6, rotX: Math.PI / 2.3, rotY: -Math.PI / 4 }
    ];

    this.rings = ringParams.map(param => {
      const geo = new THREE.TorusGeometry(param.radius, param.tube, 16, 120);
      const mat = new THREE.MeshBasicMaterial({
        color: param.color,
        transparent: true,
        opacity: 0.65
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = param.rotX;
      ring.rotation.y = param.rotY;
      this.ringsGroup.add(ring);
      return { mesh: ring, speed: (Math.random() * 0.2 + 0.1) * (Math.random() > 0.5 ? 1 : -1) };
    });

    this.scene.add(this.ringsGroup);
  }

  buildAgentNodes() {
    this.agentNodesGroup = new THREE.Group();
    this.agentNodes = [];

    const nodesData = [
      {
        name: "SAP Joule Studio",
        category: "Enterprise AI Agent Hub",
        color: 0xf59e0b,
        geo: new THREE.IcosahedronGeometry(0.32, 0),
        orbitRadius: 2.6,
        orbitSpeed: 0.35,
        orbitAngle: 0,
        orbitPlane: 'xy'
      },
      {
        name: "n8n Autonomous Workflows",
        category: "Self-Hosted Multi-Agent Automation",
        color: 0xff6d5a,
        geo: new THREE.OctahedronGeometry(0.34, 0),
        orbitRadius: 3.2,
        orbitSpeed: -0.28,
        orbitAngle: Math.PI * 0.4,
        orbitPlane: 'xz'
      },
      {
        name: "Microsoft Power Platform & Copilot",
        category: "Power Automate & AI Builder",
        color: 0x0078d4,
        geo: new THREE.BoxGeometry(0.4, 0.4, 0.4),
        orbitRadius: 3.8,
        orbitSpeed: 0.22,
        orbitAngle: Math.PI * 0.8,
        orbitPlane: 'yz'
      },
      {
        name: "Enterprise ERP & S/4HANA",
        category: "Financial & Supply Chain Pipelines",
        color: 0x10b981,
        geo: new THREE.DodecahedronGeometry(0.3, 0),
        orbitRadius: 4.2,
        orbitSpeed: -0.18,
        orbitAngle: Math.PI * 1.3,
        orbitPlane: 'xy'
      },
      {
        name: "OpenAI GPT-4 & LLM Core",
        category: "Reasoning & Cognitive Synthesis",
        color: 0x00f2fe,
        geo: new THREE.IcosahedronGeometry(0.35, 1),
        orbitRadius: 2.9,
        orbitSpeed: 0.42,
        orbitAngle: Math.PI * 1.7,
        orbitPlane: 'xz'
      },
      {
        name: "Vector Store & RAG Knowledge",
        category: "Compliance & Enterprise Memory",
        color: 0xa855f7,
        geo: new THREE.TetrahedronGeometry(0.35, 0),
        orbitRadius: 3.5,
        orbitSpeed: -0.3,
        orbitAngle: Math.PI * 0.15,
        orbitPlane: 'yz'
      }
    ];

    // Energy link lines geometry
    const linkPoints = [];
    nodesData.forEach(() => {
      linkPoints.push(new THREE.Vector3(0, 0, 0));
      linkPoints.push(new THREE.Vector3(0, 0, 0));
    });
    this.linksGeometry = new THREE.BufferGeometry().setFromPoints(linkPoints);
    const linksMaterial = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    this.linksMesh = new THREE.LineSegments(this.linksGeometry, linksMaterial);
    this.scene.add(this.linksMesh);

    nodesData.forEach((data, idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: false
      });
      const mesh = new THREE.Mesh(data.geo, mat);
      mesh.userData = { ...data, index: idx };

      // Outer glow halo wireframe
      const haloGeo = data.geo.clone();
      haloGeo.scale(1.3, 1.3, 1.3);
      const haloMat = new THREE.MeshBasicMaterial({
        color: data.color,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(halo);

      this.agentNodesGroup.add(mesh);
      this.agentNodes.push({ mesh, ...data });
    });

    this.scene.add(this.agentNodesGroup);
  }

  buildParticleField() {
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x00f2fe);
    const colorB = new THREE.Color(0x8b5cf6);
    const colorC = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const dice = Math.random();
      const c = dice < 0.6 ? colorA : dice < 0.85 ? colorB : colorC;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particleField = new THREE.Points(geometry, material);
    this.scene.add(this.particleField);
  }

  buildDataGrid() {
    const gridHelper = new THREE.GridHelper(24, 28, 0x00f2fe, 0x1e293b);
    gridHelper.position.y = -4.5;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.22;
    this.gridHelper = gridHelper;
    this.scene.add(gridHelper);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 16;
    this.controls.enabled = false; // Disabled by default until user toggles 3D mode
  }

  setInteractiveMode(enabled) {
    this.interactiveMode = enabled;
    this.controls.enabled = enabled;
    if (enabled) {
      this.container.classList.add('interactive-mode');
    } else {
      this.container.classList.remove('interactive-mode');
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / this.width - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / this.height - 0.5) * 2;

      this.mouseCoords.x = (e.clientX / this.width) * 2 - 1;
      this.mouseCoords.y = -(e.clientY / this.height) * 2 + 1;
    });

    // Touch support for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.targetX = (e.touches[0].clientX / this.width - 0.5) * 2;
        this.mouse.targetY = -(e.touches[0].clientY / this.height - 0.5) * 2;
      }
    }, { passive: true });

    // Scroll progress tracker
    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
    }, { passive: true });

    // Raycast click on 3D nodes
    this.canvas.addEventListener('click', () => {
      if (this.hoveredNode && window.showAgentNodeModal) {
        window.showAgentNodeModal(this.hoveredNode.userData);
      }
    });
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  updateRaycaster() {
    this.raycaster.setFromCamera(this.mouseCoords, this.camera);
    const meshes = this.agentNodes.map(n => n.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let hitMesh = intersects[0].object;
      while (hitMesh.parent && !hitMesh.userData.name) {
        hitMesh = hitMesh.parent;
      }
      if (this.hoveredNode !== hitMesh) {
        if (this.hoveredNode) this.resetNodeHighlight(this.hoveredNode);
        this.hoveredNode = hitMesh;
        this.highlightNode(this.hoveredNode);
      }
      this.canvas.style.cursor = 'pointer';
    } else {
      if (this.hoveredNode) {
        this.resetNodeHighlight(this.hoveredNode);
        this.hoveredNode = null;
      }
      this.canvas.style.cursor = this.interactiveMode ? 'grab' : 'default';
    }
  }

  highlightNode(mesh) {
    mesh.scale.set(1.35, 1.35, 1.35);
    mesh.material.emissiveIntensity = 1.4;
    // Dispatch custom event for UI tooltip
    const event = new CustomEvent('threeNodeHover', {
      detail: {
        name: mesh.userData.name,
        category: mesh.userData.category,
        color: mesh.userData.color
      }
    });
    window.dispatchEvent(event);
  }

  resetNodeHighlight(mesh) {
    mesh.scale.set(1, 1, 1);
    mesh.material.emissiveIntensity = 0.6;
    window.dispatchEvent(new CustomEvent('threeNodeUnhover'));
  }

  updateCameraForScroll() {
    if (this.interactiveMode) return; // Allow user free orbit in 3D mode

    // Interpolate camera between waypoints based on scroll progress
    const points = this.cameraPositions;
    const segmentCount = points.length - 1;
    const scaledProgress = this.scrollProgress * segmentCount;
    const index = Math.min(Math.floor(scaledProgress), segmentCount - 1);
    const fraction = scaledProgress - index;

    const currentPos = points[index].pos;
    const nextPos = points[index + 1].pos;

    // Smooth lerp camera position
    const targetCamX = THREE.MathUtils.lerp(currentPos.x, nextPos.x, fraction) + this.mouse.x * 0.45;
    const targetCamY = THREE.MathUtils.lerp(currentPos.y, nextPos.y, fraction) + this.mouse.y * 0.45;
    const targetCamZ = THREE.MathUtils.lerp(currentPos.z, nextPos.z, fraction);

    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.05;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.05;

    this.camera.lookAt(0, 0, 0);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth mouse inertia
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Neural Core rotations
    if (this.coreGroup) {
      this.icoMesh.rotation.x = time * 0.35;
      this.icoMesh.rotation.y = time * 0.45;

      this.outerMesh.rotation.y = -time * 0.25;
      this.outerMesh.rotation.z = time * 0.15;

      const breathe = 1 + Math.sin(time * 2.2) * 0.06;
      this.innerCore.scale.set(breathe, breathe, breathe);
    }

    // Rings rotation
    if (this.rings) {
      this.rings.forEach(r => {
        r.mesh.rotation.z += r.speed * delta;
      });
    }

    // Orbiting Agent Nodes
    const linkPositions = this.linksGeometry.attributes.position.array;
    this.agentNodes.forEach((node, i) => {
      const angle = node.orbitAngle + time * node.orbitSpeed;
      const radius = node.orbitRadius;

      let x = 0, y = 0, z = 0;
      if (node.orbitPlane === 'xy') {
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = Math.sin(angle * 2) * 0.6;
      } else if (node.orbitPlane === 'xz') {
        x = Math.cos(angle) * radius;
        y = Math.cos(angle * 1.5) * 0.7;
        z = Math.sin(angle) * radius;
      } else {
        x = Math.sin(angle * 1.3) * 0.8;
        y = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      }

      node.mesh.position.set(x, y, z);
      node.mesh.rotation.x += 0.02;
      node.mesh.rotation.y += 0.03;

      // Update link line coordinates (from center 0,0,0 to node)
      const lineIdx = i * 6;
      linkPositions[lineIdx] = 0;
      linkPositions[lineIdx + 1] = 0;
      linkPositions[lineIdx + 2] = 0;

      linkPositions[lineIdx + 3] = x;
      linkPositions[lineIdx + 4] = y;
      linkPositions[lineIdx + 5] = z;
    });
    this.linksGeometry.attributes.position.needsUpdate = true;

    // Particle field slow celestial drift
    if (this.particleField) {
      this.particleField.rotation.y = time * 0.04;
      this.particleField.rotation.x = time * 0.02;
    }

    // Grid animation
    if (this.gridHelper) {
      this.gridHelper.position.z = (time * 0.5) % 1;
    }

    // Interactive or scroll camera
    if (this.interactiveMode) {
      this.controls.update();
    } else {
      this.updateCameraForScroll();
    }

    // Raycast hover check
    this.updateRaycaster();

    this.renderer.render(this.scene, this.camera);
  }

  resetCamera() {
    this.camera.position.set(0, 0, 9);
    this.controls.target.set(0, 0, 0);
    this.camera.lookAt(0, 0, 0);
  }
}

// Instantiate and expose globally
window.portfolio3DScene = new PortfolioScene();
