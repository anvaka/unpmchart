let FragmentShader = `

varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0);
}`;


let VertexShader = `
attribute vec3 color;
uniform vec3 aspect;
varying vec3 vColor;

void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize = 20. * (600.0 / length( mvPosition.z ) )/aspect.x;
  gl_Position = projectionMatrix * mvPosition;
}`;

export default {
  VertexShader,
  FragmentShader
};
