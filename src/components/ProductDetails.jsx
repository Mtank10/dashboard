
import {useState,useEffect} from 'react'
import { getProducts,AddProduct,deleteProduct,updateProduct,sortProducts } from '../lib/utils';
import  { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import AddProductForm from './AddProductForm';
import UpdateProduct from './UpdateProduct';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { CircularProgress } from '@mui/material';

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [products,setProduct] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedProduct,setSelectedProduct] = useState(null);


    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await getProducts(); // Call the fetchData function
          setProduct(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchProducts(); // Call the fetchProducts function inside useEffect
    }, []);
    const handleAddProduct =async (newProductData)=>{
        //add the new product
        try{
        setLoading(true);
        const response = await AddProduct(newProductData);
        setProduct([...products,response]);
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
    
    const handleDelete = async (productId)=>{
        try{
            setLoading(true);
           await deleteProduct(productId);
        setProduct(products.filter((product)=>product.id !== productId));
        }catch(error){
            console.log(error)
        }finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (productId,updatedData)=>{
        try{
            setLoading(true);
        const response = await updateProduct(productId,updatedData);
        setProduct(products.map((product)=>product.id === productId ? response : product))
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }
    const handleSortProducts = async ()=>{
        try{
            setLoading(true);
            const data = await sortProducts();
            setProduct(data);
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenUpdateDialog = (product) => {
    setSelectedProduct(product);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    handleUpdate(selectedProduct.id,selectedProduct);
  };

  // Render dialogs
  const renderAddDialog = () => {
    return (
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <AddProductForm onAddProduct={handleAddProduct} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          {/* <Button onClick={handleCloseAddDialog}>Add</Button> */}
        </DialogActions>
      </Dialog>
    );
  };

  const renderUpdateDialog = () => {
    return (
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <UpdateProduct product={selectedProduct} onUpdateProduct={handleUpdate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          {/* <Button onClick={handleCloseUpdateDialog}>Update</Button> */}
        </DialogActions>
      </Dialog>
    );
  };

  

  return (
    <>
    {!user ? (
      <Paper elevation={3} style={{ marginLeft:'85px', padding: '20px', marginTop: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Login first to access product details
      </Typography>
    </Paper>
    ) :
  
    <Paper elevation={3} style={{ marginLeft:'85px' ,padding: '20px', marginTop: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Product Details
      </Typography>
      <Button style={{marginBottom:'10px', marginRight:'10px'}} variant="contained" color="primary" 
      onClick={()=>handleOpenAddDialog()}
      >Add Product</Button>
      <Button style={{marginBottom:'10px', marginRight:'10px'}} variant="contained" color="primary" onClick={handleSortProducts}>Sort</Button>
      
      {/* {renderProductTable()} */}
      {renderAddDialog()}
      {renderUpdateDialog()}
      <Paper sx={{ width: '100%',marginTop:'10px', overflow: 'hidden' }}>
      {loading ? (<CircularProgress />):
      (
        products.length > 0 ? (
          <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.image}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" 
                  onClick={() => handleOpenUpdateDialog(product)}
                  >Update</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        ):(
           <Typography>No products available</Typography>
        )
      )
    }
    </Paper>  
    </Paper>
    }
    </>
  );
};

export default ProductDetails;
