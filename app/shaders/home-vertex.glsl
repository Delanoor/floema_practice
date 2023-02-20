#define PI 3.14159265359

attribute vec3 position;
attribute vec2 uv;

uniform float uSpeed;
uniform vec2 uViewportSizes;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

    newPosition.z -= (sin(newPosition.y / uViewportSizes.y  * PI + PI / 2.0)) * uSpeed;
    
    gl_Position = projectionMatrix * newPosition;
}