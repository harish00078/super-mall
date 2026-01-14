
import {useEffect,useState} from "react";
import axios from "axios";

export default function Products(){
  const [products,setProducts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5001/api/products")
      .then(res=>setProducts(res.data));
  },[]);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p=><div key={p._id}>{p.name} ₹{p.price}</div>)}
    </div>
  );
}
