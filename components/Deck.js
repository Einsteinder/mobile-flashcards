import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { List } from 'react-native-elements'

class Deck extends Component{



render(){
    const users = [
        {
           name: 'brynn',
           avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
        },
       ]
       
    return(

   
   
   // implemented with Text and Button as children
   <List>
   <Card
     title='HELLO WORLD'>
     <Text style={{marginBottom: 10}}>
       The idea with React Native Elements is more about component structure than actual design.
     </Text>
     <Button
       icon={{name: 'code'}}
       backgroundColor='#03A9F4'
       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
       title='VIEW NOW' />
   </Card>
   <Card
     title='HELLO WORLD'>
     <Text style={{marginBottom: 10}}>
       The idea wit阿斯顿发Elements is more about component structure than actual design.
     </Text>
     <Button
       icon={{name: 'code'}}
       backgroundColor='#03A9F4'
       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
       title='VIEW NOW' />
   </Card>
   </List>

   
    )
}
}

export default withNavigationFocus(Deck)
