import THREE from 'three';
import fly from 'three.fly';
import {VertexShader, FragmentShader} from './shaders/particle.js';
import dispatch from '../dispatcher.js';
import createHitTest from './hit-test.js';
import getNearestIndex from './getNearestIndex.js';
export default createStage;

const SIDE_LENGTH = 512;

function createStage() {
  var camera, renderer, scene, controls, geometry, uniforms;
  var positions, colors, hitTest;

  var pr = 10; // particle radius
  var lastHovered;
  init();
  requestAnimationFrame(render);

  var api = {
    setHistogram
  };

  return api;

  function setHistogram(histogram) {
    var keys = Object.keys(histogram);
    keys.sort(byCount);
    hitTest.reset();

    var legend = [];
    var color = new THREE.Color();
    var keysLength = keys.length;
    var totalColors = 6;
    var step = Math.round(keysLength / totalColors);
    var posIdx = 0;
    var maxBarPopulation = histogram[keys[0]].length;
    var barWidth = Math.ceil(maxBarPopulation/500);

    for (var i = 0; i < keysLength; ++i) {
      var keyName = keys[i];
      var indices = histogram[keyName];

      var band = i % totalColors;
      var hue = (band * step)/keysLength;
      var assignedColor = color.setHSL(hue, 1.0, 0.5);

      legend.push({
        name: keyName,
        color: assignedColor.getHexString(),
        count: indices.length
      });

      setColor(indices, assignedColor);
      drawBar(indices, barWidth, i);
    }

    dispatch({
      type: 'legend',
      legend
    });
    geometry.getAttribute('color').needsUpdate = true;
    geometry.getAttribute('position').needsUpdate = true;

    function byCount(x, y) {
      return histogram[y].length - histogram[x].length;
    }

    function setPositions(indices) {
      //todo: animate?
      for (var i = 0; i < indices.length; ++i) {
        var i3 = indices[i] * 3;
        var x = posIdx % SIDE_LENGTH;
        var y = (posIdx / SIDE_LENGTH) | 0;

        positions[i3 + 0] = x * pr;
        positions[i3 + 1] = y * pr;
        posIdx += 1;
      }
    }
    function drawBar(indices, barWidth, offset) {
      var dx = pr * offset * (barWidth + 20);
      for (var i = 0; i < indices.length; ++i) {
        var i3 = indices[i] * 3;
        var x = i % barWidth;
        var y = (i / barWidth) | 0;

        positions[i3 + 0] = dx + x * pr;
        positions[i3 + 1] = y * pr;
      }
    }
  }

  function setColor(indices, color) {
    for (var i = 0; i < indices.length; ++i) {
      var i3 = indices[i] * 3;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    hitTest.update(scene, camera);
    controls.update(1);
    adjustMovementSpeed(controls, camera);
  }

  function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000000);
    scene = new THREE.Scene();

    uniforms = {
      aspect: {
        type: "v3",
        value: getCameraUniform()
      },
    };

    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    var particles = SIDE_LENGTH * SIDE_LENGTH;

    geometry = new THREE.BufferGeometry();

    positions = new Float32Array(particles * 3);
    colors = new Float32Array(particles * 3);

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    var particleSystem = new THREE.Points(geometry, shaderMaterial);
    particleSystem.frustumCulled = false;

    scene.add(particleSystem);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);

    var container = document.getElementById('three-root');
    container.appendChild(renderer.domElement);
    controls = fly(camera, container, THREE);
    camera.position.z = 5700;
    camera.position.x = 1700;
    camera.position.y = 1800;
    adjustMovementSpeed(controls, camera);
    hitTest = createHitTest(particleSystem, container, controls);
    hitTest.on('over', reportMouseOver);

    window.addEventListener('resize', onWindowResize, false);
  }

  function reportMouseOver(e) {
    var nearestIndex = getNearestIndex(positions, e.indexes, e.ray, 30);
    if (lastHovered === nearestIndex) return;
    lastHovered = nearestIndex;
    // each node has three coordinages.
    var modelIndex = lastHovered === undefined ? undefined: lastHovered/3;

    dispatch({
      type: 'hover',
      data: {
        index: modelIndex,
        x: e.x,
        y: e.y
      }
    });
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    uniforms.aspect.value = getCameraUniform();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function getCameraUniform() {
    return new THREE.Vector3(camera.aspect, window.innerWidth, window.innerHeight);
  }


  function adjustMovementSpeed(controls, camera) {
    var absZ = Math.abs(camera.position.z);
    var z = Math.min(absZ, 5700);
    var speed = Math.max(0.1, z / 57);
    controls.movementSpeed = speed;
  }
}
