import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {updateProfile} from '../../redux/actions/profile'
import {useNavigate} from 'react-router-dom'
import {loadUser} from '../../redux/actions/user'
import { useDispatch } from 'react-redux';

const UpdateProfile = ({user}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  };
  return (
    <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Update Profile"
          my="16"
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor='pink.500'
          

          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="pink.500"
            
          />
          <Button
            
            w="full"
            bg={'rgb(200, 81, 146)'} 
            color={'white'}
            type="submit"
            _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }}
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile
