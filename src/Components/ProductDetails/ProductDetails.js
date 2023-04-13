import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './ProductDetails.css'
const ProductList = () => {
    const location = useLocation()
    const { product } = location.state

    useEffect(()=>{
        const viewCount =  window.localStorage.getItem(product.id);
        window.localStorage.setItem(product.id, parseInt(viewCount)+1);
    },[])

    return (
        <div className='container'>
        
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography align="center" variant="h3"  color="text.primary" gutterBottom>
                {product.brand}
                </Typography>
                <Typography align="center" variant="h5" color="text.secondary" gutterBottom>
                {product.title}
                </Typography>
                <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {product.description}
                </Typography>
               <Rating  value={product.rating} precision={0.5} defaultValue={0} readOnly />
                <div>
                    
                   <span style={{display:"flex",flexDirection:"row-reverse"}}>
                   <Typography align="left" sx={{ fontSize: 14 }} color="red" gutterBottom>
                        -{product.discountPercentage}%
                    </Typography>
                        {/* <strong>Price       :</strong> */}
                        <Typography  sx={{ fontSize: 30 }} color="black" gutterBottom>
                        <CurrencyRupeeIcon /> {product.price}
                        </Typography>
                    </span>
                </div>
                <div style={{ display: 'inline-block', padding: '5%' }}>
                {product.images.map((image)=>
                    <img src={image} alt="product thumnail"/>
                )}
                </div>
                
            </CardContent>
            
            </Card>
               
        </div>
    )
}

export default ProductList;