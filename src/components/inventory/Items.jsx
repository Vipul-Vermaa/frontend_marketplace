import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { getInventoryItems } from '../../redux/actions/inventory';
import { server } from '../../redux/store';

const Items = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { inventoryItem, loading, error } = useSelector((state) => state.inventory);
  const [item, setItem] = useState(null);

  useEffect(() => {
    dispatch(getInventoryItems(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (inventoryItem && inventoryItem._id === id) {
      setItem(inventoryItem);
    }
  }, [id, inventoryItem]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${server}/inventory/${item._id}`;
    link.download = item.title; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!item) return <Heading>Loading ...</Heading>;
  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error: {error}</Heading>;

  return (
    <Container>
      <VStack align="start" spacing={4}>
        <Heading>{item.title}</Heading>
        <Text>{item.description}</Text>
        <Text>Created by: {item.createdBy}</Text>
        <Button bg={'rgb(200,81,146)'} color={'white' } _hover={{color:'pink.500', bgColor:'rgb(245, 240, 243 )', borderBottom:'2px' }} onClick={handleDownload}>
          Download File
        </Button>
      </VStack>
    </Container>
  );
};

export default Items;
