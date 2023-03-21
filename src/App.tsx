import { Canvas, Vector3 } from "@react-three/fiber";

import { useEffect, useState, useRef } from "react";
import { Mesh } from "three/src/objects/Mesh";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { rewrite } from "./redux/slices/dataSlice";
import { CameraControls, Grid, Environment, RandomizedLight } from "@react-three/drei";
import { Shadow } from "@react-three/drei";
import "./styles/canvasContainer.scss";
import Box from "./components/Box";
import { Camera } from "three";
import Dashboard from "./components/Dashboard";
import MuiNavbar from "./components/MuiNavbar";

function App() {
  const countries = useSelector((state: RootState) => state.data.value);
  const cameraControlRef = useRef<CameraControls | null>(null);
  const [currentFocus, setCurrentFocus] = useState<null | number | undefined>(0)
  const dispatch = useDispatch();

  
 

  const countriesRef = useRef<any>([]);

  const deaths = [
    1212310, 1442321, 2231242, 3123532, 4251245, 2523125, 1987426, 3452123,
    2736143, 1681923, 2041121, 1902302, 2854123, 3243122, 1399821, 2323121,
    1912351, 2678123, 1539822, 1678241, 2863121, 3125321, 1749822, 2098312,
    1421312, 1928421,
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
    cameraControlRef.current?.moveTo(28, 10, 30, true)
  }
  
  function setFocus(list: string[], target: string) {
    if(currentFocus == undefined) return
    const index = countriesRef.current.findIndex((item: any) => item.current.name === target);
    
 
    let posx = countriesRef.current[index].current.position.x
    let posy = countriesRef.current[index].current.position.y 
    let posz = countriesRef.current[index].current.position.z
    cameraControlRef.current?.reset(true)
    

    cameraControlRef.current?.moveTo(posx, posy, posz, true)
    
  }
useEffect(() => {
  setTimeout(() => {
  resetCam()

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
    <div className='App'>
      {/* <MuiNavbar /> */}
      <Dashboard  setFocus={setFocus} />
      <div id='canvas-container'>
        <Canvas>
          <CameraControls ref={cameraControlRef} minDistance={10} />
          <Shadow
            position={[0, -0.9, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[100, 100, 1]}
          />

          <Ground />

          <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
          <Environment preset='city' />
          {countries.map((country, index) => {
            return (
              <Box index={index} countriesRef={countriesRef} key={index} />
            );
          })}
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
      </div>
    </div>
  );
}

export default App;
