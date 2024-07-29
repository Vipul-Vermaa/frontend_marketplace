import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {loadUser} from '../../redux/actions/user'
import toast from 'react-hot-toast';
import Header from '../header/Header';

const Profile = () => {
  const dispatch=useDispatch()
  const {message,error}=useSelector(state=>state.profile)
  const {message:subscriptionMessage,error:subscriptionError}=useSelector(state=>state.subscription)
  const {user}=useSelector(state=>state.user)

  

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, subscriptionError, subscriptionMessage])

  

  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
      <Header/>
    <Heading children="Profile" m="8" textTransform={'uppercase'} />

    <Stack
      justifyContent={'flex-start'}
      direction={['column', 'row']}
      alignItems={'center'}
      spacing={['8', '16']}
      padding="8"
    >
      <VStack>
        <Avatar boxSize={'48'}/> </VStack>

      <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
        <HStack>
          <Text children="Name:" fontWeight={'bold'} />
          <Text children={user?.name} />
        </HStack>{' '}
        <HStack>
          <Text children="Email:" fontWeight={'bold'} />
          <Text children={user?.email} />
        </HStack>
        <HStack>
          <Text children="CreatedAt:" fontWeight={'bold'} />
          <Text children={user?.createdAt?.split('T')[0]} />
        </HStack>
        {user?.role !== 'admin' && (
          <HStack>
            <Text children="Subscription" fontWeight={'bold'} />
            {user?.subscription && user.subscription.status === 'active' ? (
              <Button
                
                color={'pink.500'}
                variant="unstyled"
              >
                 Subscribed
              </Button>
            ) : (
              <Link to="/subscribe">
                <Button bg={'rgb(200,81,146)'}
            color={'white'} _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }} >Subscribe</Button>
              </Link>
            )}
          </HStack>
        )}
        <Stack direction={['column', 'row']} alignItems={'center'}>
          <Link to="/updateprofile">
            <Button bg={'rgb(200, 81, 146)'} color={'white'} _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }} >Update Profile</Button>
          </Link>

          <Link to="/changepassword">
            <Button bg={'rgb(200, 81, 146)'} color={'white'} _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }} >Change Password</Button>
          </Link>

          <Link to="/createinventory">
            <Button bg={'rgb(200, 81, 146)'} color={'white'} _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }}>Create Inventory</Button>
          </Link>
        </Stack>
      </VStack>
    </Stack>                   
  </Container>
);
};

export default Profile;






