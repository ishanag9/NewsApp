import { View, Text, Animated, PanResponder, Modal, TouchableWithoutFeedback, StatusBar } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { styles } from '../constants/styles';
import { windowHeight } from '../constants/utils';

const ModalComponent = (props) => {
    const swiping = useRef(new Animated.Value(windowHeight)).current; //for swiping modal

    const resetPositionAni = Animated.timing(swiping, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
    })

    const closeAnimation = Animated.timing(swiping, {
        toValue: windowHeight,
        duration: 500,
        useNativeDriver: true,
    })

    const translateY = swiping.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const handleDismiss = () => closeAnimation.start(props.onDismiss);

    useEffect(() => {
        resetPositionAni.start();
    }, [resetPositionAni]);

    const panResponders = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => false,
          onPanResponderMove: Animated.event([null, {dy: swiping}], {
            useNativeDriver: false,
          }),
          onPanResponderRelease: (_, gs) => {
            if (gs.dy > 0 && gs.vy > 2) {
              return handleDismiss();
            }
            return resetPositionAni.start();
          },
        }),
      ).current;
    

  return (
    <Modal
        animated
        animationType="fade"
        visible={props.visible}
        transparent
        onRequestClose={handleDismiss}>
       <StatusBar hidden/>   
       <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.modalView2}>
        <Animated.View style={{...styles.subModalView2, transform: [{translateY: translateY}],}}
          {...panResponders.panHandlers}>
            <View style={styles.sliderIndicatorRow}>
                <View style={styles.sliderIndicator} />
            </View>
            {props.children}
        </Animated.View>
        </View>
        </TouchableWithoutFeedback>  
    </Modal>
  );
};

export default ModalComponent;
