import React from 'react'
import { View, Text, TextInput} from 'react-native'
import {FONTS} from "../constants/theme"
import { windowWidth, windowHeight } from '../constants/utils'


const FormInput = ({
    width,
    height,
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    keyboardType,
    autoCompleteType = "off",
    autoCapitalize,
    errorMsg = ""
}) => {
    return (
        <View style={{ ...containerStyle}}>
            {/* Label & Error msg */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
            <Text style={{color: 'gray', ...FONTS.body4}}>
                {label}
            </Text>
            <Text style={{color: 'red', ...FONTS.body4}}>
                {errorMsg}
            </Text>
            </View> 

            {/* TextInput */}
            <View style={{
                    flexDirection: 'row',
                    height: 45,
                    paddingHorizontal: 20,
                    marginTop: '1%',
                    borderRadius: 8,
                    // borderWidth:1,
                    // borderColor:'gray',
                    // backgroundColor: 'lightgray'
                    // backgroundColor: 'whitesmoke'
                    backgroundColor: '#E8E8E8'
                }}
            >
                {prependComponent}

                <TextInput 
                    style={{
                        flex: 1,
                        ...inputStyle
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={'grey'}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize} 
                    onChangeText={(text) => onChange(text)}
                />
                    {appendComponent}
                
            </View>       
        </View>
    )
}

export default FormInput
