import React from 'react'
import { TouchableOpacity, Text, Touchable } from 'react-native'
import { FONTS } from '../constants/theme'

const TextButton = ({buttonContainerStyle, label, labelStyle, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0C54BE',
                ...buttonContainerStyle
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: 'white',
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

        </TouchableOpacity>
    )
}

export default TextButton
