import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WeatherDataContextProvider} from './context/WeatherDataContext';
import TopBarNavigation from './navigation/TopBarNavigation';

function App(): React.JSX.Element {
  return (
    <WeatherDataContextProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <TopBarNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </WeatherDataContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
