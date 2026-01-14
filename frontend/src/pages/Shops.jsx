
import {useEffect,useState} from "react";
import axios from "axios";

export default function Shops(){
  const [shops,setShops] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5001/api/shops")
      .then(res=>setShops(res.data));
  },[]);

  return (
    <div>
      <h2>Shops</h2>
      {shops.map(s=><div key={s._id}>{s.name}</div>)}
    </div>
  );
}
