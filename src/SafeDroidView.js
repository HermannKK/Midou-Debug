import { StyleSheet, Platform } from 'react-native';

export default class StyleSheetFactory {
    static getSheet(sizeUp) {
        return StyleSheet.create({
            droidSafeArea: {
                flex: 1,
                paddingTop: Platform.OS === 'android' ? sizeUp : 0,
                // paddingBottom: Platform.OS== 'android' ? sizeDown :0,
            },
        })
    }
}