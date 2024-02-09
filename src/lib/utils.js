import axios from 'axios';
export const getProducts =async ()=>{
    try{
        const response = await axios.get('https://fakestoreapi.com/products')
        const result= await response.data;        
        return result;
    }
    catch(err){
        console.log(err)
    }
}

export const AddProduct = async(newProduct)=>{
    try{
        const response = await axios.post('https://fakestoreapi.com/products',newProduct);
        const result= await response.data;
        return result;
    }
    catch(err){
        console.log(err)
    }
}

export const updateProduct = async (productId,updatedData)=>{
        try{
            const response = await axios.put(`https://fakestoreapi.com/products/${productId}`,updatedData);
            const result= await response.data;
            return result;
        }
        catch(err){
            console.log(err)
        }

}

export const deleteProduct = async (productId)=>{
    try{
         await axios.delete(`https://fakestoreapi.com/products/${productId}`);
        
    }catch(err){
        console.log(err)
    }
}

export const sortProducts = async ()=>{
    try{
        const response = await axios.get('https://fakestoreapi.com/products?sort=desc')
        const result= await response.data;
        return result;
    }catch(err){
        console.log(err);
    }
}