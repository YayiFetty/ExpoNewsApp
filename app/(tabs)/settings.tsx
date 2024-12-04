// import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import { Stack } from 'expo-router'
// import { MaterialIcons } from '@expo/vector-icons'
// import { Colors } from 'react-native/Libraries/NewAppScreen'


// type Props = {}

// const Page = (props: Props) => {
// const [isEnabled, setIsEnabled] = useState(false);
// const toggleSwitch = () => setIsEnabled((prev) => !prev)
//   return (
//     <>
//       <Stack.Screen
//       options={{
//         headerShown:true,

//       }}/>

//       <View style={styles.container}>
//         <TouchableOpacity style={styles.itemBtn}>
//         <Text style={styles.itemBtnTxt}>
//           About
//         </Text>
//         <MaterialIcons name='arrow-forward-ios'
//         size={16}
//         color={Colors.lightGrey}/>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.itemBtn}>
//         <Text style={styles.itemBtnTxt}>
//           Send Feedback
//         </Text>
//         <MaterialIcons name='arrow-forward-ios'
//         size={16}
//         color={Colors.lightGrey}/>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.itemBtn}>
//         <Text style={styles.itemBtnTxt}>
//           Policy Privacy
//         </Text>
//         <MaterialIcons name='arrow-forward-ios'
//         size={16}
//         color={Colors.lightGrey}/>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.itemBtn}>
//         <Text style={styles.itemBtnTxt}>
//           Terms of Use
//         </Text>
//         <MaterialIcons name='arrow-forward-ios'
//         size={16}
//         color={Colors.lightGrey}/>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch} >
//         <Text style={styles.itemBtnTxt} >
//           Dark Mode
//         </Text>
//         <Switch trackColor={{false:"#767577", true:"#3e3e3e"}}
//           thumbColor={isEnabled ? "#f5dd4b":"#f4f3f4"}
//           ios_backgroundColor="#3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//           style={{transform:[{scale:0.8}],  }}/>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.itemBtn}>
//         <Text style={[styles.itemBtnTxt, {color:"red"}]} >
//           Logout
//         </Text>
//         <MaterialIcons name='logout'
//         size={16}
//         color={"red"}/>
//         </TouchableOpacity>
//       </View>
//     </>
//   )
// }

// export default Page

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding:20,
//     gap:10
//   },
//   itemBtn:{
//     flexDirection:"row",
//     justifyContent:"space-between",
//     alignItems:"center",
//     backgroundColor:Colors.white,
//     paddingHorizontal:16,
//     paddingVertical:20,
//     borderBottomColor:Colors.background,
//     borderBottomWidth:1

//   },
//   itemBtnTxt:{
//     fontSize:14,
//     fontWeight:"500",
//     color:Colors.black
//   }
// })




import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type Props = {}

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev)
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />

      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>About</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Send Feedback</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Policy Privacy</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Terms of Use</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch}>
          <Text style={styles.itemBtnTxt}>Dark Mode</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{false: "#767577", true: "#3e3e3e"}}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switchStyle}
            />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnTxt, {color: "red"}]}>Logout</Text>
          <MaterialIcons name='logout' size={16} color="red" />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10
  },
  itemBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1
  },
  itemBtnTxt: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black
  },
  switchContainer: {
    paddingRight: 0, // Reducing padding on the right for the Switch
  },
  switchStyle: {
    transform: [{ scale: 0.8 }], // Reducing the size of the Switch
  }
})