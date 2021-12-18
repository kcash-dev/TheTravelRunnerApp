import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import tailwind from 'tailwind-rn';

const AudioPlayer = ({ source }) => {
  const sound = useRef(new Audio.Sound());
  const [ status, setStatus ] = useState({
    shouldPlay: false
  })
  const [ sourceSound, setSourceSound ] = useState(source)
  const [ loaded, setLoaded ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ isPlaying, setIsPlaying ] = useState(false)

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true
    })
    loadAudio();

    return ()=>{
      sound && sound.unloadAsync()
    }
  }, [])

  const playAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          setIsPlaying(true)
          sound.current.playAsync()
        }
      }
    } catch (error) {}
  }

  const pauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          setIsPlaying(false)
          sound.current.pauseAsync();
        }
      }
    } catch (error) {}
  }

  const loadAudio = async () => {
    setLoading(true)
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({ uri: sourceSound }, status, false)
        if (result.isLoaded === false) {
          setLoading(false);
          console.error('Error in Loading Audio');
        } else {
          setLoading(false);
          setLoaded(true);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  return (
    <View style={ tailwind(`my-5`) }>
      { loading ?
        <ActivityIndicator size={'small'} color={'red'} />
        :
        <View>
          { loaded === false ? 
            <View>
              <ActivityIndicator />
              <Text>Loading Song</Text>
            </View>
            :
            <View>
              { isPlaying ? 
                <Button title="Pause Audio" onPress={ pauseAudio } />
                :
                <Button title="Play Audio" onPress={ playAudio } />
              }
            </View>
          }
        </View>
      }
    </View>
  );
}

export default AudioPlayer

const styles = StyleSheet.create({})
