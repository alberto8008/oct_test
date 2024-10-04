import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { color } from "../constants";

const Header: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Currency Converter</Text>
            <Text style={styles.subtitle}>Check the latest rates</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: color.HEADER_BG,
        alignItems: "center", 
        borderBottomWidth: 1,
        marginTop:20,
        borderBottomColor: color.HEADER_BOTTOM,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: color.HEADER_TITLE, 
    },
    subtitle: {
        fontSize: 16,
        color: color.HEADER_TITLE2,
    },
});

export default Header;
