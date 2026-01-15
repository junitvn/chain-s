import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
export function FormHeader({ title, helpText, required }: { title: string, helpText?: string, required?: boolean }) {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.label}>
                {title}
                {required && <ThemedText style={styles.required}> *</ThemedText>}
            </ThemedText>

            {helpText && (
                <ThemedText style={styles.helpText}>{helpText}</ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    required: {
        color: '#E53935',
    },
    helpText: {
        fontSize: 12,
        opacity: 0.7,
        lineHeight: 20,
        marginTop: 4,
    },
});