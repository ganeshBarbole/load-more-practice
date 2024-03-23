import React, { useEffect, useState } from 'react'
import './index.css'

const App = () => {
  const [loading , setLoading] = useState(false);
  const [product , setProduct] = useState([]);
  const [count , setCount] = useState(0);
  const [disable , setDisable] = useState(false)

  const fetchData = async() => {
     try {
      setLoading(true)
        const res =  await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`)
        const result = await res.json()
        console.log(result)
        if(result && result.products && result.products.length){
          setProduct((prevData) => [...prevData , ...result.products])
        }
        setLoading(false)
     } catch (error) {
      console.log(error)
      setLoading(false)
     }
  }

  useEffect(()=>{
    fetchData()
  },[count])

  useEffect(()=>{
    if(product && product.length === 100){
      setDisable(true)
    }
  },[product])

  if(loading){
    <div>loading ....</div>
  }

  return (
    <div className='load-container'>
      <div className='product-container'>
      {product && product.length ? 
       product.map((item)=> (
        <div className='product' key={item.id}>
          <img alt={item.title} src={item.thumbnail}/>
           <p>{item.title}</p>
        </div> 
       ))
      :null}
      </div>
      <div className='button-container'>
        <button disabled={disable} onClick={()=>setCount(count+1)}>load-more-product</button>
        {disable ? <p>you have reached to 100 products</p> :null}
      </div>
    </div>
  )
}

export default App