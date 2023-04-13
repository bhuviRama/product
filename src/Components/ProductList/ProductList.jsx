import React, { useEffect,useState,useCallback,useMemo } from 'react';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import './ProductList.css'   

const ProductList = () => {
    const url = "https://dummyjson.com/products";
    const limit = 10;
    const [ products,setProducts ] = useState([]);
    const [ mostViewedProducts,setMostViewedProducts ] = useState([]);
    let count = 0;
    const getProducts = async() => {
        
        await fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
           
            setProducts(data.products)
        })
    }

    const  getMostViewedProducts = useCallback(() => {
        let arr=[];
        products.map((product)=>{
            let count = window.localStorage.getItem(product.id);
            if(count>0){
                arr.push({
                    id: product.id,
                    views: count,
                })
            }
        })
        console.log(arr)
        arr.sort((a,b) => parseInt(a.views) < parseInt(b.views) ? 1:-1);
        let items = products.filter(({ id: id1 }) => arr.some(({ id: id2 }) => id2 === id1));
        let viewedProducts = [];
        arr.filter((x) => items.map((y) =>{
            if(x.id === y.id){
                viewedProducts.push(y);
            }
        }))
        setMostViewedProducts(viewedProducts);
    },[products])

    useEffect(()=>{
        
        getProducts();
        products.map((product)=>{
            window.localStorage.setItem(product.id, count);
        });
         getMostViewedProducts();
        console.log(mostViewedProducts)
    },[])

    useEffect(()=>{
        getMostViewedProducts();
    },[getMostViewedProducts])

    
//className="App-header"
    return (
        <div>
            {mostViewedProducts.length >0 && 
            <header className="App-header">
                 {/* <Typography align="left" sx={{ fontSize: 14 }} color="text.secondary" >
                    Most viewed
                </Typography> */}
                <span className='most-viewed'>Most viewd products...</span>
                {
                    mostViewedProducts.map((product,index)=>{
                        if(index<3){
                            return(
                                <div >
                                    <Link to={`/products/${product.brand}/${product.title}`} state={{ product}}>
                                        <img  src={product.thumbnail} alt="product thumnail"/>
                                    </Link>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>
                                        {product.title}
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                        
                    })
                }
            </header>
}
<Typography variant="h3" gutterBottom>
                    Products
                </Typography>
           {products.length>0 && 
           products.map((product,index)=>{
            if(index<limit ){
                return (
                    <div style={{ display: 'inline-block', padding: '5%' }}>
                <Link to={`/products/${product.brand}/${product.title}`} state={{ product}}>
                    <img className="avatar" src={product.thumbnail} alt="product thumnail"/>
                </Link>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                  {product.title}
                </span>
              </div>
          </div>
                    
                )
            }
            
           })
           }
        </div>
    )
}

export default ProductList;