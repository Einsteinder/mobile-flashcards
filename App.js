import React from 'react';
import { StyleSheet, Text, View ,Platform} from 'react-native';
import AddDeck from './components/AddDeck'
import { TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Quiz from './components/Quiz'

import AddCard from './components/AddCard'
import { AsyncStorage } from 'react-native'
const SET_STORAGE_KEY = 'UdaciFlashcards:decks'


import { updateFocus } from 'react-navigation-is-focused-hoc'

import './ReactotronConfig'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {

  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})


export default class App extends React.Component {
  
  async UNSAFE_componentWillMount(){
      return await AsyncStorage.mergeItem(SET_STORAGE_KEY, JSON.stringify({
        Initial: {title:"Initial",questions:[{question:"what is react",answer:"Watch me!"}
        ,{question:"what is react native",answer:"Watch me!"}
        ,{question:"what is iphone",answer:"Watch me!"}
        ,{question:"who are you",answer:"Watch me!"}
        ,{question:"wehre are you",answer:"Watch me!"}
        ,{question:"where am I",answer:"Who knows"}
        ,{question:"who am I",answer:"Nobody cares"}
    ]}
    
      }))
    }

  render() {
    return (
        <View style={{flex: 1}}>

      <MainNavigator  onNavigationStateChange={(prevState, currentState) => {
          updateFocus(currentState)
        }}/>

      </View>
    );
  }
}
