import React, { Component } from 'react';
import {  Text, TextInput, View,StyleSheet,Alert } from 'react-native';
import TextButton from './TextButton'
import {timeToString } from '../utils/helpers'
import { submitEntry ,fetchDecks} from '../utils/api'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'




class AddDeck extends Component {
  state = {
    text:""
  }

   addDeck = async() => {

    const key = this.state.text
    if(!key){
      return false
    }
    const entry = {}

    const decks = await fetchDecks()
    if(decks[key]){
      Alert.alert(
        'The deck name ' +"\""+key+"\""+' exists'
     )
     return
    }

    submitEntry({ key, entry })
    this.setState({text:""})
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }
  render() {
    return (
      <View style={styles.center}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to add deck!"
          onChangeText={(text) => this.setState({text})}
          ref={element => {
                this.attendee = element
              }}
          value={this.state.text.toString()}
        

          
        />
        <TextButton style={{padding: 10}} onPress={this.addDeck}>
            Submit
          </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})
export default withNavigationFocus(AddDeck, 'AddDeck')
