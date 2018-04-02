import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api'
import { purple, white } from '../utils/colors'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { List, ListItem } from 'react-native-elements'



class Decks extends Component {
    state = {
        decks: { "sdffd": "asdfasdf" }
    }

    async componentDidMount() {
        const decks = await fetchDecks()
        this.setState({ decks: decks })


    }

    async componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            const decks = await fetchDecks()
            this.setState({ decks: decks })
            // screen enter (refresh data, update ui ...)
        }

    }

    render() {
        return (
            <ScrollView>



                <List>
                    {
                        Object.keys(this.state.decks).map((deck) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'Deck',
                            )}>
                                <ListItem
                                    key={deck}
                                    title={<View style={styles.subtitleView}>
                                        <Text style={styles.ratingText}>{deck}</Text>
                                    </View>}
                                    subtitle={
                                        <View style={styles.subtitleView}>
                                            <Text style={styles.ratingText}>Number of words: </Text>
                                        </View>
                                    }

                                />
                            </TouchableOpacity>

                        ))
                    }
                </List>

            </ScrollView>

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
        marginLeft: 30,
        marginRight: 30,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
})
export default withNavigationFocus(Decks)
