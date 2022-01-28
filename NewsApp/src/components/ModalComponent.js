import { View, Text, Animated, PanResponder, Modal, TouchableWithoutFeedback, StatusBar } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { styles } from '../constants/styles';
import { windowHeight } from '../constants/utils';

const ModalComponent = (props) => {
    const swiping = useRef(new Animated.Value(windowHeight)).current; //for swiping modal

    const resetPositionAni = Animated.timing(swiping, { //value to close the modal view
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
    })

    const closeAnimation = Animated.timing(swiping, { //value for sliding the modal view
        toValue: windowHeight,
        duration: 500,
        useNativeDriver: true,
    })

    const translateY = swiping.interpolate({    //interpolating the animation values of swiping
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const handleDismiss = () => closeAnimation.start(props.onDismiss);

    useEffect(() => {
        resetPositionAni.start();
    }, [resetPositionAni]);

    //swipe up and down the modal view
    const panResponders = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => false,
          onPanResponderMove: Animated.event([null, {dy: swiping}], {
            useNativeDriver: false,
          }),
          onPanResponderRelease: (_, gs) => { //dismiss or reset modal on direction and speed 
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
          {/* Container slide from  bottom screen and transform used to respond animation value */}
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
