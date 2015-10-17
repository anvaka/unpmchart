import THREE from 'three';
import fly from 'three.fly';
import {VertexShader, FragmentShader} from './shaders/particle.js';
import dispatch from '../dispatcher.js';
export default createStage;

const SIDE_LENGTH = 512;

function createStage() {
  var camera, renderer, scene, controls, geometry;
  var positions, colors;
  var labels;
  init();
  requestAnimationFrame(render);

  var api = {
    setLabels,
    setHistogram
  };

  return api;

  function setLabels(newLabels) {
    labels = newLabels;

    // hide invisible/not created packages:
    var color = new THREE.Color();
    for (var i = newLabels.length * 3; i < colors.length; i += 3) {
      colors[i] = 0;
      colors[i + 1] = 0;
      colors[i + 2] = 0;
    }

    geometry.getAttribute('customColor').needsUpdate = true;
  }

  function setHistogram(histogram) {
    var keys = Object.keys(histogram);
    keys.sort(byCount);

    var legend = [];
    var color = new THREE.Color();
    for (var i = 0; i < keys.length; ++i) {
      var keyName = keys[i];
      var indices = histogram[keyName];
      var assignedColor = color.setHSL(i / keys.length, 1.0, 0.5);
      legend.push({
        name: keyName,
        color: assignedColor.getHexString(),
        count: indices.length
      });

      setColor(indices, assignedColor);
    }

    dispatch({
      type: 'legend',
      legend
    });
    geometry.getAttribute('customColor').needsUpdate = true;

    function byCount(x, y) {
      return histogram[y].length - histogram[x].length;
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
    controls.update(1);
  }

  function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
    scene = new THREE.Scene();

    var uniforms = {
      color: {
        type: "c",
        value: new THREE.Color(0xffffff)
      },
      texture: {
        type: "t",
        value: THREE.ImageUtils.loadTexture("textures/spark.png")
      }

    };

    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });

    var particles = SIDE_LENGTH * SIDE_LENGTH;

    geometry = new THREE.BufferGeometry();

    positions = new Float32Array(particles * 3);
    colors = new Float32Array(particles * 3);
    var sizes = new Float32Array(particles);

    var color = new THREE.Color();
    var pr = 10;

    for (var x = 0; x < SIDE_LENGTH; ++x) {
      for (var y = 0; y < SIDE_LENGTH; ++y) {
        var i = x + y * SIDE_LENGTH;
        var i3 = i * 3;
        positions[i3 + 0] = x * pr/2;
        positions[i3 + 1] = y * pr/2;
        positions[i3 + 2] = 0;

        color.setHSL(i / particles, 1.0, 0.5);

        colors[i3 + 0] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = 20;
      }
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

    var particleSystem = new THREE.Points(geometry, shaderMaterial);

    scene.add(particleSystem);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);

    var container = document.getElementById('three-root');
    container.appendChild(renderer.domElement);
    controls = fly(camera, container, THREE);
    controls.movementSpeed = 10;
    camera.position.z = 200;

    window.addEventListener('resize', onWindowResize, false );
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }
}
