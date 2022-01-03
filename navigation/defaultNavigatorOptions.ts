import { StackNavigationOptions } from "@react-navigation/stack"
import Colors from "../constants/Colors"


export const defaultScreenOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: 'white',
}
