import { Canvas, Vector3 } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { Mesh } from "three/src/objects/Mesh";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { rewrite } from "./redux/slices/dataSlice";
import { CameraControls, Grid, Environment, RandomizedLight } from "@react-three/drei";

import "./styles/canvasContainer.scss";
import Box from "./components/Box";

function App() {
  const countries = useSelector((state: RootState) => state.data.value);
  const cameraControlRef = useRef<CameraControls | null>(null);
  const dispatch = useDispatch();

  
 

  const countriesRef = useRef<any>([]);

  const deaths = [
    1212310, 1442321, 2231242, 3123532, 4251245, 2523125, 1987426,
  ];
  const covid = [33, 15, 23, 41, 2, 4, 5];

  function reset() {
    let changeTest = countries.map((c) => {
      if (c.name === "US") {
        return { ...c, Data: 0 };
      } else {
        return { ...c, Data: 0 };
      }
    });
    dispatch(rewrite(changeTest));
    console.log(changeTest);
  }

  function populate(dataset: number[]) {
    let newData = countries.map((c, index) => {
      return { ...c, Data: dataset[index] };
    });

    dispatch(rewrite(newData));
    console.log(countries);
  }

  function resetCam() {
    cameraControlRef.current?.reset(true)
  }
  
  function setTargetUSA() {
    let posx = countriesRef.current[0].current.position.x
    let posy = countriesRef.current[0].current.position.y 
    let posz = countriesRef.current[0].current.position.z
    cameraControlRef.current?.reset(true)
    
    console.log('settargetusa', posx,posy,posz)
    cameraControlRef.current?.moveTo(posx, posy, posz, true)
    
  }
useEffect(() => {
setTimeout(() => {

  console.log(countriesRef.current[0].current.geometry.boundingSphere.center)
  console.log(countriesRef.current[0].getWorldPosition())
}, 1000)
},[])
  // console.log(countriesRef.current[0].current.geometry)

  function Ground() {
    const gridConfig = {
      cellSize: .000001,
      cellThickness: 1,
      cellColor: "green",
      sectionSize: 4,
      sectionThickness: 1,
      sectionColor: "lightgreen",
      fadeDistance: 300,
      fadeStrength: 1,
      followCamera: true,
      infiniteGrid: true,
    };
    return (
      <Grid position={[0, -.90, 0]} args={[10.5, 10.5]} {...gridConfig} />
    );
  }


  return (
    <div id='canvas-container'>
      <Canvas>
        <CameraControls ref={cameraControlRef} minDistance={0}/>

        <Ground />
        
        <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
        <Environment preset='city' />
        {countries.map((country, index) => {
          return <Box index={index} countriesRef={countriesRef} key={index} />;
        })}
        {/* <OrbitControls /> */}
      </Canvas>
      <button
        style={{ position: "absolute", bottom: 0, zIndex: 99 }}
        onClick={() => reset()}
      >
        Reset
      </button>
      <button
        style={{ position: "absolute", bottom: 30, zIndex: 99 }}
        onClick={() => populate(deaths)}
      >
        death Dataset
      </button>
      <button
        style={{ position: "absolute", bottom: 60, zIndex: 99 }}
        onClick={() => populate(covid)}
      >
        Covid infection
      </button>
      <button
        style={{ position: "absolute", bottom: 90, zIndex: 99 }}
        onClick={() => resetCam()}
      >
        Reset Camera
      </button>
      <button
        style={{ position: "absolute", bottom: 120, zIndex: 99 }}
        onClick={() => setTargetUSA()}
      >
        focus USA
      </button>
    </div>
  );
}

export default App;
