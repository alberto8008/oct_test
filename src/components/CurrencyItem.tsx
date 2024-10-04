import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { color } from "../constants";

interface CurrencyItemProps {
    country: string;
    code: string;
    rate: number;
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({ country, code, rate }) => {
    const inverseRate = (1 / rate).toFixed(4);
    return (
        <View style={styles.container}>
            <Text style={styles.country}>
                {country} <Text style={styles.code}>({code})</Text>
            </Text>
            <View style={styles.rateContainer}>
                <Text style={styles.rate}>
                    1{code} = <Text style={rate <= 1.0 ? styles.highlightedRate : styles.rate}>{inverseRate} USD</Text>
                </Text>
                <Text style={styles.rate}>
                    1USD ={" "}
                    <Text style={rate <= 1.0 ? styles.rate : styles.highlightedRate}>
                        {rate.toFixed(4)}
                        {code}
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: color.ITEM_BG,
        borderRadius: 8,
        shadowColor: color.SHADOW,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    country: {
        fontSize: 18,
        fontWeight: "bold"
    },
    code: {
        fontSize: 16,
        color: color.CURRENCY_CODE
    },
    rateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rate: {
        fontSize: 16,
        color: color.RATE
    },
    highlightedRate: {
        fontSize: 18,
        color: color.GREAT_CURRENCY,
        fontWeight: "bold"
    }
});

export default CurrencyItem;
