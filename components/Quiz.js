import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { List } from 'react-native-elements'
import TextButton from './TextButton'
import { purple, white } from '../utils/colors'


class Quiz extends Component {
    state = {
        currentCardIndex: 0,
        show: "question",
        result: false,
        correct:0

    }
    changeShowStatus = () => {
        this.state.show === "question" ? this.setState({ show: "answer" }) : this.setState({ show: "question" })
    }

    correctNextCard = (deckContent) => {
        this.setState({ correct:this.state.correct+1})
        this.state.currentCardIndex < deckContent.questions.length - 1 ? this.setState({
            currentCardIndex: this.state.currentCardIndex + 1,
            
        }) : this.setState({ result: true })
    }
    nextCard = (deckContent) => {
        this.state.currentCardIndex < deckContent.questions.length - 1 ? this.setState({
            currentCardIndex: this.state.currentCardIndex + 1
        }) : this.setState({ result: true })
    }
    render() {
        const { deckContent } = this.props.navigation.state.params

        return (


<View  style={styles.container}>
{this.state.result?<Text style = {styles.center}>Great Job! Your pecentage of correct is: {(100 * this.state.correct / deckContent.questions.length).toFixed(2)} %</Text>:
            <List>
                <Card 
                    title={this.state.currentCardIndex+"/"+deckContent.questions.length}>

                    {this.state.show === "question" ?
                        <View>
                            <Text >
                                {deckContent.questions[this.state.currentCardIndex].question}
                            </Text>
                            <TextButton  onPress={this.changeShowStatus}>
                                Answer
                            </TextButton>
                        </View>
                        :
                        <View>
                            <Text >
                                {deckContent.questions[this.state.currentCardIndex].answer}
                            </Text>
                            <TextButton onPress={this.changeShowStatus}>
                                Question
                            </TextButton>
                        </View>

                    }


                    <Button
                        icon={{ name: 'check' }}
                        backgroundColor='#74D600'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Correct'
                        onPress={() => this.correctNextCard(deckContent)} />

                    <Button
                        icon={{ name: 'close' }}
                        backgroundColor='#F20505'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Incorrect'
                        onPress={() => this.nextCard(deckContent)} />

                </Card>

            </List>
            
}
</View>

        )
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
    },
})
export default withNavigationFocus(Quiz)
