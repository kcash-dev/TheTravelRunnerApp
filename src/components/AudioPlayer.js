import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { render } from 'react-dom';

export default class AudioPlayer extends Component {
  async componentDidMount() {
      Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true
      })

      this.sound = new Audio.Sound();

      const status = {
          shouldPlay: false
      }

      this.sound.loadAsync({ uri: this.props.source }, status, false)
  }

    playSound() {
        this.sound.playAsync();
    }

  render() {
      return (
        <View style={styles.container}>
          <Button title="Play Audio" onPress={this.playSound.bind(this)} />
        </View>
      );
  }
}

const styles = StyleSheet.create({})
