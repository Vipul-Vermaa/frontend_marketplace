import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
import {changePassword} from '../../redux/actions/profile'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const dispatch=useDispatch()
  const submitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const{message,error}=useSelector(state=>state.profile)
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
  }, [dispatch,error,message])
  

  return (
    <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Change Password"
          my="16"
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            type={'password'}
            focusBorderColor="pink.500"
          />

          <Input
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            focusBorderColor="pink.500"
          />

          <Button
            w="full"            
            bg={'rgb(200,81,146)'}
            color={'white'}
            type="submit"
            _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }}
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default ChangePassword
