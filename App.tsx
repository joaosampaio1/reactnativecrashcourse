import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, FlatList, Alert} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
//import { uuid } from 'uuidv4';

const App = () => {

   const [items, setItems] = useState([
    {id: 1, text: 'Milk'},
    {id: 2, text: 'Eggs'},
    {id: 3, text: 'Bread'},
    {id: 4, text: 'Juice'},
  ]); 

 // const [items, setItems] = useState([]);

  useEffect(()=> {
    const getItems = async () => {
      const itemsFromServer = await fetchItems();
      setItems(itemsFromServer);
     }
  getItems();
},[]);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data
    console.log(data);
   }

  /* const deleteItem = (id: number) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  } */

  const deleteItem = async (id: any) => {
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    })
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  }

  /*const addItem = (text: any) => {
    if(!text) {
      Alert.alert('Error', 'Please enter an item');
    }else {
      setItems(prevItems => {
        return [{id: Math.random()*10000+1, text}, ...prevItems]
      });
    }
  }*/

  const addItem = async (text:any) => {
    
    if(!text) {
      Alert.alert('Error', 'Please enter an item');
    }else {
      const newItem = {id: Math.random()*10000+1, text};
      const res = await fetch('http://localhost:5000/items', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(newItem),
      })
      const data = await res.json();
      setItems([...items, data]);
    }
  }
  
  return (
    <View style={styles.container}>
      <Header title='Shopping List'/>
      <AddItem addItem={addItem}/>
     {  <FlatList 
      data={items}
      renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem}/>}
      
      /> }
       {/* <Image source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.img} />  */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    //justifyContent: 'center',
    //alignItems: 'center',
   },
  /*text: {
    color: 'darkslateblue',
    fontSize: 30,
  },
  img: {
    width:100,
    height:100,
    borderRadius: 100/2,
  } */
})

export default App