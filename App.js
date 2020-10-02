import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import { Audio } from 'expo-av';

import buzz from './assets/buzz.mp3';
import play from './assets/media_play.png';

export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = { playbackObject: null }
  }

  async componentDidMount() {
    this.setState({ playbackObject: await new Audio.Sound() });
    try
    {
      await this.state.playbackObject.loadAsync(buzz);
    } catch (e) {
      ToastAndroid.show("Error occurred! " + e,ToastAndroid.SHORT);
    }
  }

  async playSound() {
    try {
    await this.state.playbackObject.stopAsync();
    await this.state.playbackObject.playAsync();
    } catch (e) {
      ToastAndroid.show("Error occurred! " + e,ToastAndroid.SHORT);
    }
  }
  render()
  {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={this.playSound.bind(this)}>
      <Image
        style={{ width: 100, height: 100}}
        source={play}
      />
      </TouchableOpacity>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
