import React, { useEffect, useState } from 'react'
import {Box, Button, Container, Heading, Text, VStack} from '@chakra-ui/react'
import {useDispatch, useSelector} from 'react-redux'
import {buySubscription} from '../../redux/actions/user'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { server } from '../../redux/store'

const Subscribe = () => {

  const dispatch=useDispatch()
  const [key, setKey] = useState('');
  const {error,subscriptionId}=useSelector(state=>state.subscription)
  const {error:inventoryError}=useSelector(state=>state.inventory)
  const { user } = useSelector(state => state.user);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };


  const subscribeHandler = async () => {    
    try {
      const { data: { key } } = await axios.get(`${server}/razorpaykey`);
      setKey(key);
      dispatch(buySubscription());
      console.log('subs')
    } catch (err) {
      console.error(err);
      toast.error('Failed to get Razorpay key');
    }
  };

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(inventoryError){
        toast.error(inventoryError);
          dispatch({type:'clearError'})
        
      }

      if(subscriptionId){   
        const openPopUp=async ()=>{
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error('Razorpay SDK failed to load');
          return;
        }

          const options={
            key,
            name:'ProjectMarketPlace',
            description:"Get Access",
            subscription_id:subscriptionId,
            callback_url:`${server}/paymentverification`,prefill:{
              name: user.name,
              email: user.email,
            }
          }
          const razor=new window.Razorpay(options)
          razor.open()
        }
        openPopUp()
      }
    }, [dispatch,error,key,subscriptionId,user])
    

  
  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="pink.500" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`For Only - ₹299.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
            <Text children={`Join us and get access to all content.`} />
            <Heading size="md" children={'₹299 Only'} />
          </VStack>

          <Button
            my="8"
            w="full"
            bg={'rgb(200,81,146)'}
            color={'white'}
            onClick={subscribeHandler}
            _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }}
          >
            Buy Now
          </Button>
        </Box>      
      </VStack>
      </Container>
  )
}

export default Subscribe
