
import { useEffect, useState } from 'react';
import './App.css';
const API_URL="https://jsonplaceholder.typicode.com/photos"


function App() {
const [data,setData]=useState([]);
const[pageData,setPageData]=useState([]);
const[isScroll,setScroll]=useState(false);
 

function addPhoto(){
  console.log("add photo")
  console.log(data,pageData);
  // setPageData([...pageData,...data.slice(pageData.length,pageData.length+10)]);
  // setPageData(prev=>[...prev,...prev]);
  setScroll(true);
}
function scrollFun(){
   
   if(document.documentElement.scrollHeight-1<=window.innerHeight+window.scrollY){
    console.log("condition matched")
    addPhoto();
   }
}
  useEffect(()=>{
       fetch(API_URL).then(res=>res.json()).then(d=>{
        setData(d);
        setPageData(d.slice(0,10));
       })
       window.addEventListener("scroll",scrollFun);
       return ()=>window.removeEventListener("scroll",scrollFun);
  },[])

  useEffect(()=>{
    console.log(pageData.length,"length")
      setPageData([...(data.slice(0,pageData.length+10))]);
      setScroll(false);
      console.log("ussefect2");
  },[isScroll])
  console.log(window.innerHeight);
  return (
    <div className="App">
      <div className='img-container'>
        {
          pageData.map((photo)=>{
            return(
            <div className='img-box' key={photo.id}>
              <img src={photo.url} alt="" />
            </div>

            )
          })
        }
      </div>
    </div>
  );
}

export default App;
