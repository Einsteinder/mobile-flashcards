import React, { Component } from 'react';
import {  Text, TextInput, View,StyleSheet,Alert,TouchableOpacity } from 'react-native';
import TextButton from './TextButton'
import {timeToString } from '../utils/helpers'
import { submitEntry ,fetchDecks} from '../utils/api'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'




class AddCard extends Component {
  state = {
    question:"",
    answer:""
  }

   addCard = async() => {

    const question = this.state.question
    const answer = this.state.answer

    if(!question || !answer){
      return false
    }
    const { deckName } = this.props.navigation.state.params

    const decks = await fetchDecks()
    const newQuestions =[]
    if(decks[deckName].questions.length>0){
      for(let i = 0 ;i<decks[deckName].questions.length;i++){
        newQuestions.push(decks[deckName].questions[i])
      }
    }

    newQuestions.push({question:question,
      answer:answer
  })
    const updatedDeck = Object.assign({},{...decks[deckName],questions:newQuestions})
    console.log(updatedDeck)
    const updatedDecks = Object.assign({},{...decks,deckName:updatedDeck})


    submitEntry({ key:deckName, entry:updatedDeck  })
    this.setState({question:"",answer:""})

    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }
  render() {
    return (
      <View style={styles.center}>
        <Text>Input question: </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to add question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question.toString()}
        />
        <Text>Input answer: </Text>

        <TextInput
          style={{height: 40}}
          placeholder="Type here to add anwser"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer.toString()}
        />
        <TextButton style={{padding: 10}} onPress={this.addCard}>
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
export default withNavigationFocus(AddCard, 'AddCard')
