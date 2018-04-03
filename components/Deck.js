import React, { Component } from 'react';
import { View, Text, Image,TouchableOpacity,Alert} from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { List } from 'react-native-elements'
import { fetchDecks } from '../utils/api'

class Deck extends Component {
    state={
        decks:{},
        deckName:"", 
        deckContent:{},
        decksLength:0
    }
    async componentDidMount() {
        
        const decks = await fetchDecks()
        const { deckName } = await this.props.navigation.state.params

        this.setState({ decks: decks,deckName:deckName,deckContent:decks[deckName],decksLength:decks[deckName].questions.length })
    

    }

    async componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            const decks = await fetchDecks()
            const { deckName } = await this.props.navigation.state.params
    
            this.setState({ decks: decks,deckName:deckName,deckContent:decks[deckName],decksLength:decks[deckName].questions.length })
        
          // screen enter (refresh data, update ui ...)
        }

      }
    render() {  
 

        startQuiz =()=>{
            this.state.decksLength===0?     Alert.alert(
                "Please add cards first"
             ):this.props.navigation.navigate(
                'Quiz', {
                    deckContent:this.state.deckContent
                })
        }

        return (



            // implemented with Text and Button as children
            <List>
                <Card
                    title={this.state.deckName}>
                    <Text style={{ marginBottom: 10 }}>
                        Here is {this.state.decksLength} cards totally. Start quiz or add cards.
     </Text>

            
                        <Button
                            icon={{ name: 'assignment' }}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Start Quiz'
                            onPress={startQuiz } />
                   
                        <Button
                            icon={{ name: 'add' }}
                            backgroundColor='#0324a3'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Add Card' 
                            onPress={()=>this.props.navigation.navigate(
            'AddCard', {
                deckName:this.state.deckName
            }) }/>
  
   </Card>

   </List>


                )
            }
            }
            
            export default withNavigationFocus(Deck)
