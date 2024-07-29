import {createAction,createReducer} from '@reduxjs/toolkit'


export const createInventoryRequest=createAction('createInventoryRequest') 
export const createInventorySuccess=createAction('createInventorySuccess') 
export const createInventoryFail=createAction('createInventoryFail') 

export const deleteInventoryRequest=createAction('deleteInventoryRequest')
export const deleteInventorySuccess=createAction('deleteInventorySuccess')
export const deleteInventoryFail=createAction('deleteInventoryFail')

export const allInventoryRequest=createAction('allInventoryRequest')
export const allInventorySuccess=createAction('allInventorySuccess')
export const allInventoryFail=createAction('allInventoryFail')

export const getInventoryItemsRequest=createAction('getInventoryItemsRequest')
export const getInventoryItemsSuccess=createAction('getInventoryItemsSuccess')
export const getInventoryItemsFail=createAction('getInventoryItemsFail')


export const clearError=createAction('clearError')
export const clearMessage=createAction('clearMessage')


const initialState={
    loading:false,
    message:'',
    error:null,
    inventory: [],
    inventoryItem:[],
}


export const inventoryReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(createInventoryRequest,state=>{
        state.loading=true;
    })
    .addCase(createInventorySuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload
    })
    .addCase(createInventoryFail,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })



    
    .addCase(deleteInventoryRequest,state=>{
        state.loading=true;
    })
    .addCase(deleteInventorySuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    })
    .addCase(deleteInventoryFail,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })


    .addCase(getInventoryItemsRequest,state=>{
        state.loading=true;
    })
    .addCase(getInventoryItemsSuccess,(state,action)=>{
        state.loading=false;
        state.inventoryItem=action.payload;
    })
    .addCase(getInventoryItemsFail,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })


    .addCase(allInventoryRequest,state=>{
        state.loading=true;
    })
    .addCase(allInventorySuccess,(state,action)=>{
        state.loading=false;
        state.inventory=action.payload;
    })
    .addCase(allInventoryFail,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    .addMatcher(
        (action)=>action.type===clearError.type,state=>{
            state.error=null;
        })
    .addMatcher(
        (action)=>action.type===clearMessage.type,state=>{
            state.message=null;
        }
    ) 
})