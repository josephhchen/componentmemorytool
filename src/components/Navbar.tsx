import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

const Navbar = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconButton}>
        <Icon name="home" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="search" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="add" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="heart-circle" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Icon name="person-circle" size={26} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    backgroundColor: '#fff',
    padding: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
})

export default Navbar
