import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from "react-native";
import CurrencyItem from "../components/CurrencyItem";
import { TextInput } from "react-native";
import { useCurrency } from "../hooks/useCurrency";
import { useQueryClient } from "@tanstack/react-query";
import { color } from "../constants";

const CurrencyList = () => {
    const { filteredRates, lastUpdatedDate, keyword, setKeyword, isLoading, error } = useCurrency();

    const queryClient = useQueryClient();
    const handleRefetch = () => queryClient.invalidateQueries();

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching data</Text>;
    return (
        <View style={styles.container}>
            {lastUpdatedDate && <Text style={styles.lastUpdatedText}>Last Updated: {lastUpdatedDate}</Text>}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Currency Name or Code"
                    value={keyword}
                    onChangeText={(text) => setKeyword(text)}
                />
                <TouchableOpacity style={styles.refetchButton} onPress={handleRefetch}>
                    <Text>Refetch</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredRates}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => (
                    <CurrencyItem country={item[1].name} code={item[1].code} rate={item[1].rate} />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    lastUpdatedText: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 4,
        textAlign: "center"
    },
    loadingText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 18
    },
    errorText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
        color: "red"
    },
    list: {
        padding: 16
    },
    searchContainer: {
        width: "100%",
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    refetchButton: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: color.HEADER_BG,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight:10,
    },
    input: {
        height: 50,
        backgroundColor: "#f1f1f1",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#333",
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        width:"70%"
    }
});

export default CurrencyList;
