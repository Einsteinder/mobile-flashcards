import React, { Component } from 'react';
import { View, Text, Image,TouchableOpacity,Alert} from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { List } from 'react-native-elements'

class Deck extends Component {


    render() {   
        const { deckName, deckContent } = this.props.navigation.state.params
        startQuiz =()=>{
            deckContent.questions.length===0?     Alert.alert(
                "Please add cards first"
             ):this.props.navigation.navigate(
                'Quiz', {
                    deckContent:deckContent
                })
        }

        return (



            // implemented with Text and Button as children
            <List>
                <Card
                    title={deckName}>
                    <Text style={{ marginBottom: 10 }}>
                        Here is {deckContent.questions.length} cards totally. Start quiz or add cards.
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
                deckName:deckName
            }) }/>
  
   </Card>

   </List>


                )
            }
            }
            
            export default withNavigationFocus(Deck)
