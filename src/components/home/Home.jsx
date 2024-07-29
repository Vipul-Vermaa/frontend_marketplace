import {
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
import {getAllInventory} from '../../redux/actions/inventory'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/Header';

const Items=({ title, description, id, creator })=>{

  return (
    <VStack 
    className="items" 
    alignItems={['center', 'flex-start']} 
    borderColor='pink.500'
    borderWidth="2px"
    borderRadius='10px'
    m='2px'
    p='8px'
    minH={'150px'}
    minW={'180px'}
    >
      
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack> 
         <Text fontWeight={'bold'} textTransform="uppercase" children={'Creator'}/>
         <Text fontFamily={'body'} children={creator}/>
      </HStack>

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/inventory/${id}`}>
          <Button bg={'rgb(200,81,146)'} color={'white' } _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }}>Visit Now</Button>
        </Link>
            
      </Stack>
    </VStack>
  );
}

const Home = () => {

  const dispatch = useDispatch();  
  const { inventory} = useSelector(state => state.inventory);
  useEffect(() => {
    dispatch(getAllInventory());
  }, [dispatch]);


  useEffect(() => {
  }, [inventory]);
  
  return (
    <Container minH={'100vh'} maxW="container.lg" paddingY={'8'}>
      <Header/>
      <Heading children="All Inventory" m={'8'} />
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        
        {inventory && inventory.length > 0 ? (
          inventory.map(item => (
            <Items
              key={item._id}
              title={item.title}
              description={item.description}
              id={item._id}
              creator={item.createdBy}
              inventoryItem={item.inventoryItem}
            />
          ))
        ) : (
          <Heading mt="4" children=" Not Found" />
        )}
      </Stack>
    </Container>
  )
}

export default Home
