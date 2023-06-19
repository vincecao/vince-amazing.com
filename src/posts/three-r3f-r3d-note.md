---
title:  THREE, R3F and R3D
date: 2023-06-19 13:00:17
---

This is my learning note for [three.js](https://threejs.org/), [react three fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and [react three drei](https://github.com/pmndrs/drei#readme).

## Basic Cube

```typescript
import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}
```

## Defaults Canvas

```typescript
- webgl antialias true
- pixelRatio matches device pixelRatio
- ACESFilmicToneMapping
- sRGBEncoding

// Manually change default
<Canvas gl={{ toneMapping: * }} />
```

## Meshes

```typescript
<group>
  <mesh />
  <mesh />
</group>
```

## Attach (autoAttach with geometry and material)

```typescript
<boxGeometry attach="geometry" /> // will auto attach
<meshStandardMaterial attach="material" /> // will auto attach

<color attach="background" /> // manual attach
```

## Args

```typescript
<boxGeometry args={[2, 2, 2]} />
// same as new BoxGeometry(2, 2, 2)
```

## Animations

```typescript
const meshRef = useRef<Mesh>(null); // ref means the reference to the three instances

useFrame(() => {
  if(!meshRef.current) return;
  meshRef.current.rotation.x += 0.01;
  meshRef.current.rotation.y += 0.01;
})

return <mesh ref={meshRef} />

// same as animate() function in three
```

# Lights

## AmbientLight

```typescript
<Canvas>
  <ambientLight intensity={0.3} />
</Canvas>
```

## DirectionalLight

```typescript
const lightRef = useRef<THREE.DirectionalLight>(null)

// helper
useHelper(lightRef, DirectionalLightHelper, 5, "red")

<Canvas>
  <directionalLight ref={lightRef} position={[0, 10, 10]} />
</Canvas>
```

### Shadow support

```typescript
<Canvas shadows>
  <directionalLight 
    position={[0, 10, 10]}
    castShadow
    // optional increase box and map size for shadow
    shadow-mapSize-height={1000}
    shadow-mapSize-width={1000}
    shadow-camera-left={-20}
    shadow-camera-right={20}
    shadow-camera-top={20}
    shadow-camera-bottom={-20}
  />
	<mesh castShadow />
  <mesh receiveShadow />  {/* mesh receives shadow */}
</Canvas>
```

## PointLight

```typescript
<Canvas>
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
</Canvas>
```

## [HemisphereLight](https://threejs.org/docs/#api/en/lights/HemisphereLight)

```typescript
<Canvas>
  <hemisphereLight args={['red', 'blue', 0.4]} />
</Canvas>
```

## Color

```typescript
<meshStandardMaterial color="blue" />

// or use color children

<meshStandardMaterial>
  <color args={["blue"]} attach="color" />
</meshStandardMaterial>
```

## Orbit Controls

[useThree](https://docs.pmnd.rs/react-three-fiber/api/hooks)

```typescript
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Self implemetated orbit control
const CameraOrbitController = () => {
  const { camera, gl } = useThrees();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    return () => {
      controls.dispose();
    }
  }, [camera, gl]);
}
```

# Helpers

[Drei](https://github.com/pmndrs/drei)

## [AxesHelper](https://threejs.org/docs/#api/en/helpers/AxesHelper) / [GridHelper](https://threejs.org/docs/#api/en/helpers/GridHelper)

```typescript
<Canvas>
  <axesHelper args={[2]} />
  <gridHelper args={[10, 10]} />
</Canvas>
```

## BoxHelper(useHelper)

```typescript
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";

useHelper(meshRef, BoxHelper, "blue");
```

## [OrbitControls](https://drei.pmnd.rs/?path=/docs/controls-orbitcontrols--docs)

```typescript
import { OrbitControls } from "@react-three/drei";

<Canvas>
  <OrbitControls />
</Canvas>
```

## [TransformControls](https://drei.pmnd.rs/?path=/docs/gizmos-transformcontrols--docs)

```typescript
import { [TransformControls](https://drei.pmnd.rs/?path=/docs/gizmos-transformcontrols--docs) } from "@react-three/drei";

<Canvas>
  <[TransformControls](https://drei.pmnd.rs/?path=/docs/gizmos-transformcontrols--docs)>
    <mesh />
  </[TransformControls](https://drei.pmnd.rs/?path=/docs/gizmos-transformcontrols--docs)>
</Canvas>
```

## Stats

```typescript
import { Stats } from "@react-three/drei"

<Canvas>
  <Stats />
</Canvas>
```

## Debug

```typescript
interface DebugProps { debug?: boolean }

const Animated - ({ debug }: AnimatedProps & DebugProps) => {
  { debug ? useHelper(meshRef, BoxHelper, "blue") : null }
  return <mesh>...</mesh>
})

const debug = useMemo<boolean>(() => process.env.NODE_ENV === 'development', []);
<Canvas>
  {debug && <>
    <Stats />
    <axesHelperargs={[2]} /> {/* or <axesHelper visiable={debug} args={[2]} /> */}
    <gridHelper args={[10, 10]} />
  </>}
  <Animated debug={debug} />
</Canvas>
```

# Camera

## PerspectiveCamera

```typescript
// THREE perspective camera
// https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
// field of view, aspect ratio, near plane, far plane
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
scene.add(camera);

// R3F(@react-three/fiber) default
// { fov: 75, near: 0.1, far: 1000. position: [0, 0, 5] }
<Canvas />

// R3F(@react-three/fiber) example override PerspectiveCamera arguments
<Canvas camera={{ fov: 100 }} />
<Canvas camera={{ position: [0, 0, 10] }} />

// PerspectiveCamera from R3D(@react-three/drei)
// https://github.com/pmndrs/drei#perspectivecamera
<PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]} />
```

## OrthographicCamera

```typescript
// R3F example override
<Canvas orthographic camera={{ left: -5, right: 5, top: 5, bottom: -5, zoom: 50 }} />

// OrthographicCamera from R3D
// https://github.com/pmndrs/drei#orthographiccamera
<OrthographicCamera makeDefault {...props}>
  <mesh />
</OrthographicCamera>
```

# Geometries

- Vertexes
- Lines
- Faces

## Material

```typescript
<mesh>
  <boxGeometry />
  <meshStandardMaterial color={"blue"} wireframe />
</mesh>
```

## Texture

- texture.com
- polyhaven.com

Map Types

- Albedo (diffuse)
- Height
- Normal
- Roughness
- Ambient Occlusion

## useTexture

```typescript
const map = useTexture("...")
// example maps combo: diffuse, displacement, normal, roughness

<meshStandardMaterial map={map} normalMap={normalMap} roughnessMap={roughnessMap} displacementMap={displacementMap} />
```

Fix dense in displacement map

```typescript
<sphereGeometry args={[1, 200, 200]} />
<meshStandardMaterial 
  displacementMap={displacementMap}
  displacementScale={0.05}
/>
```

# Models

- [SketchFab](https://sketchfab.com/)
- [TurboSquid](https://www.turbosquid.com/?&utm_source=google&utm_medium=cpc&utm_campaign=US-en-TS-Brand&utm_content=Brand-TurboSquid&utm_term=turbosquid&mt=e&dev=c&itemid=&targid=kwd-297496938642&loc=9032024&ntwk=g&dmod=&adp=&gclid=CjwKCAjw-b-kBhB-EiwA4fvKrD9UvWdIj5-iV5ckV6M896yyg2rHlevPMFh8hbGTnGYqrULx7-XAYhoC3DsQAvD_BwE&gclsrc=aw.ds)

### GLTFLoader

```typescript
const Tree = () => {
  const model = useLoader(GLTFLoader, "./model/tree.glb");

  // open shadow for all children
  model.scene.traverse(() => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  })
  
  return <primitive object={model.scene} />;
}
```

## GLTFJSX

- https://github.com/pmndrs/gltfjsx

```bash
npx gltfjsx model.gltf --transform
```

- [gltf.pmnd.rs](https://gltf.pmnd.rs/)

# Transforms

## Object3D

```typescript
<object3D position={[2, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
  <primitive object={model.scene.clone()} /> {/* make transforms work only for this copy of model */}
</object3D>
```

## Group

```typescript
<group rotation={[0, 0, 0]}>
  <primitive object={model.scene.clone()} />
</group>
```

# Animations

## [useAnimations](https://drei.pmnd.rs/?path=/docs/abstractions-useanimations--docs)

```typescript
const { actions } = useAnimations(model.animations);

useEffect(() => {
  actions?.bounce?.play();
}, [])
```

Bone Animations

- [mixamo](https://www.mixamo.com/#/)
- [mixamo add-on for blender](https://substance3d.adobe.com/plugins/mixamo-in-blender/)

# References

- ****[I wish I knew this before using React Three Fiber](youtube.com/watch?v=DPl34H2ISsk)****
- ****[Building a metaverse with react three fiber](https://www.youtube.com/playlist?list=PLvfQp12V0hS3EbCBw7kDNOJ1l412tzcrM)****