import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { BufferGeometry, Material } from "three";
import { Mesh } from "three/src/objects/Mesh";
import { RootState } from "../redux/store";
import {useSelector} from 'react-redux'
import { useSpring, a } from "react-spring";
import { Text } from "@react-three/drei";

interface Props {
  index: number;
  countriesRef: React.MutableRefObject<
    React.RefObject<Mesh<BufferGeometry, Material | Material[]>>[]
  >;

 
}

export default function Box({ index, countriesRef }: Props): JSX.Element {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
  const country = useSelector((state: RootState) => state.data.value)
  const [spin, setSpin] = useState(false)
  const [sum, setSum] = useState(0)
  const [biggest, setBiggest] = useState(0)
  const [delta, setDelta] = useState(0.05)
  const [numtoShow, setNumToShow] = useState(0)
  const colors = ['red','green','blue','yellow','gray', 'purple', 'pink']
  countriesRef.current[index] = meshRef;

  const { camera } = useThree();

  const [{ cameraPosition }, setCameraPosition] = useSpring(() => ({
  cameraPosition: [0, 0, 0],
}));

  const handleClick = () => {
    if(meshRef.current)
    camera.position.set(
      meshRef.current.position.x - 0,
      meshRef.current.position.y - 0,
      meshRef.current.position.z - 10
    );
  };
  
  useFrame(({ clock }) => {
    
    if (meshRef.current === null) return;
    
    if(meshRef.current.position.y > country[index].Data/ 100000 ){
      
      setDelta(0)
    }
    if(spin) {
      const a = clock.getElapsedTime();
      // meshRef.current.rotation.x += delta ;
      
      // meshRef.current.rotation.y += delta;
      meshRef.current.position.y += delta;
      
  
    }

    
   
    
  });

  let visNum = 0;
  useEffect(() => {
    setDelta(0.05)
    console.log(delta)
    if(country[index].Data == 0 && meshRef.current){
      meshRef.current.position.y = 0;
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
      setDelta(0.05)
    }
    const sum = country.reduce((acc, obj) => acc + obj.Data, 0);
    const largest = country.reduce((max, current) => {
      return current.Data > max ? current.Data : max;
    }, country[0].Data)
    setBiggest(largest)
    setSum(sum)
    const incrementNumber = setInterval(() => {
      if(visNum > country[index].Data){
        clearInterval(incrementNumber)
      }
      visNum += 20000
      setNumToShow(visNum)
    }, 50)

  },[country])


  useEffect(() => {
    setSpin(true)
  }, [])
  return (
    <mesh position={[index * 4 - 20, 0, 0]} castShadow ref={meshRef} onClick={() => handleClick()}>
      <Text position={[0,1.7,0]} color="black" anchorX="center" anchorY="middle" fontSize={0.7}>
      {country[index].name}
      </Text>
      <Text position={[0,-1.7,0]} color="black" anchorX="center" anchorY="middle" fontSize={0.7}>
      {/* {country[index].Data} */}
      {numtoShow}
      </Text>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={colors[index]} />
    </mesh>
  );
}
