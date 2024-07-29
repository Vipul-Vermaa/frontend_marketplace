import axios from "axios";
import { server } from "../store";


export const createInventory = formData => async dispatch => {
    try {
      const config = {
        headers: 
        {'Content-type': 'multipart/form-data'},
        withCredentials: true,
      };
      dispatch({ type: 'createInventoryRequest' });
      const { data } = await axios.post(`${server}/createinventory`,formData,config); 
      dispatch({ type: 'createInventorySuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'createInventoryFail',
        payload: error.response.data.message,
      });
    }
  };



export const deleteInventory = id => async dispatch => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: 'deleteInventoryRequest' });
      const { data } = await axios.delete(`${server}/inventory/${id}`, config);
      dispatch({ type: 'deleteInventorySuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'deleteInventoryFail',
        payload: error.response.data.message,
      });
    }
  };



export const getAllInventory=()=>async dispatch=>{
    try {
        dispatch({type:'allInventoryRequest'})

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const config={
          headers:{
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
    const{data}=await axios.get(`${server}/inventory`,config)
    dispatch({type:'allInventorySuccess',payload:data.inventory})
    } catch (error) {
        dispatch({
            type:'allInventoryFail',
            payload:error.response.data.message
        })
    }
}

export const getInventoryItems=(id)=>async dispatch=>{
  try{
    dispatch({type:'getInventoryItemsRequest'})
    const {data}=await axios.get(`${server}/inventory/${id}`,{
      withCredentials:true,
    })
    dispatch({type:'getInventoryItemsSuccess',payload:data.inventoryItem})
  }catch(error){
    dispatch({
      type:'getInventoryItemsFail',
      payload:error.response.data.message
    })
  }
}