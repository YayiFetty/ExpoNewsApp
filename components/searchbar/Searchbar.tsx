import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors' 

type Props={
  withHorizontalPadding: boolean
  setSearchQuery: Function
}
const Searchbar = ({withHorizontalPadding, setSearchQuery}:Props) => {
  return (
    <View style={[styles.container, withHorizontalPadding && {paddingHorizontal:20}]}>
      <View style={styles.searchBar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey}/>
        <TextInput
        placeholder='Search'
        placeholderTextColor={Colors.lightGrey}
        style={styles.searchTxt}
        onChangeText={(query) => setSearchQuery(query)}
        autoCapitalize='none'/>
      </View>
    </View>
  )
}

export default Searchbar

const styles = StyleSheet.create({
  container:{
   marginBottom:20
  },
  searchBar:{
    backgroundColor:"#E4e4e4",
    paddingHorizontal:10,
    paddingVertical:12,
    borderRadius:10,
    flexDirection:"row",
    gap:10,
    marginBottom:10,
  },
  searchTxt:{
    fontSize:14,
    flex:1,
    color:Colors.lightGrey
  }
})
