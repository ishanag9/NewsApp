import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:'4%',
        // marginTop: "3%",
        // width: 250,
        // height: 250,
        // backgroundColor: 'yellow',
    },
    mainCardView: {
        flexDirection: 'row', alignItems: 'center', flex: 1,
        // height: 90,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        // shadowColor: Colors.shadow,
        // shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        // boxShadow: "12px 10px 17px -12px rgba(3,4,6,0.75)",
        shadowRadius: 8,
        elevation: 3,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingLeft: 16,
        // paddingRight: 14,
        // marginTop: 6,
        // marginBottom: 6,
        // marginLeft: 16,
        // marginRight: 16,
      },
      subCardView: {
        width: '62%', 
        marginLeft:'3%', 
        marginTop:'3%', 
        marginBottom:'3%'
      },
})