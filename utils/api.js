import { AsyncStorage } from 'react-native'
export const SET_STORAGE_KEY = 'UdaciFlashcards:decks'


export async function submitEntry ({ entry, key }) {

    return await AsyncStorage.mergeItem(SET_STORAGE_KEY, JSON.stringify({
      [key]: entry
    }))
  }

export async function fetchDecks () {
  let res =  await AsyncStorage.getItem(SET_STORAGE_KEY)
  let listOfDecks = await JSON.parse(res)
  return listOfDecks
 
}