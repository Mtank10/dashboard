import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import db from '../firebase'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [products,setProducts] = useState([]);

  

    useEffect(()=>{
      
        fetchProduct()
    },[])
    const fetchProduct = async ()=>{
        try{
           const response = await axios.get('https://fakestoreapi.com/products');
           const result = await response.data
           setProducts(result) 
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <Paper elevation={3} style={{ marginLeft: '85px', padding: '20px', marginTop: '20px' }}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Total Products
            </Typography>
            <Typography variant="h3" component="p">
              {products.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Paper>
  );
};

export default Dashboard;
