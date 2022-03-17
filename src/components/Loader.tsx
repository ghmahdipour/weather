import React from 'react';
import {StyleSheet, View, ActivityIndicator, Platform} from 'react-native';

const Loader = (props:any) => {
  return props.loading ? (
    <View style={styles.loaderContainer}>
      <View style={styles.indicatorContainer}>
        {Platform.OS === 'android' ? (
          <ActivityIndicator
            color={props.color ? props.color : '#54e9f4'}
            size="large"
          />
        ) : (
          <ActivityIndicator
            color={props.color ? props.color : '#54e9f4'}
            size="large"
          />
        )}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 100,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    height: '100%',
    width: '100%',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorTextContainer: {
    backgroundColor: '#fff',
    height: 130,
    marginHorizontal: 40,
    paddingTop: 10,
    paddingHorizontal: 20,
    opacity: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Loader;
