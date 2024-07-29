import React, { useEffect } from 'react'
import {
  Button,
  Container,  
  Heading, 
  Input,  
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {createInventory,getAllInventory} from '../../redux/actions/inventory'
import { fileUploadCss  } from '../auth/Register';
import Header from '../header/Header';

const CreateItems = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [file, setFile] = useState(null);
  const [fileName,setFileName]=useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {error,message} =useSelector((state) => state.inventory || {})

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);    
    myForm.append('createdBy', createdBy);
    myForm.append('file', file);
    dispatch(createInventory(myForm)).then(()=>{
      dispatch(getAllInventory())
      navigate('/')
    });
    
  };

  const handleFileChange=(e)=>{
    const selectedFile=e.target.files[0]
    setFile(selectedFile)
    setFileName(selectedFile?selectedFile.name:'')
  }


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (          
      <Container py="8">
      <Header/>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Create Inventory"
            my="16"
            textAlign={['center', 'left']}
          />

          <VStack m="auto" spacing={'8'}>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="pink.500"
            />

            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="pink.500"
            />
             <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="pink.500"
            /> 
            
            <Input
              accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              required
              type={'file'}
              focusBorderColor="pink.500"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={handleFileChange}
              />

             {fileName && (
              <div style={{border:'1px solid black', color: 'black', fontSize: '14px', width:'16rem', height:'auto', borderRadius:'5px' }}>{fileName}</div>
            )}
            
            <Button
              w="full"
              bg={'rgb(200, 81, 146)'}
              color={'white'}
              type="submit"
              _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }}
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>    
  )
}


export default CreateItems
