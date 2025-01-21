import { StyleSheet, ViewStyle } from "react-native";

import { useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface TerminalProps {
  title: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

export function Terminal({ title, style, children }: TerminalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemedView
      style={[
        styles.terminalContainer,
        { borderColor: isDark ? "#333" : "#E0E0E0" },
        style,
      ]}
    >
      <ThemedView
        style={[
          styles.terminalHeader,
          { backgroundColor: isDark ? "#333" : "#F5F5F5" },
        ]}
      >
        <ThemedText
          style={[styles.terminalTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          $ {title}
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[
          styles.terminalBody,
          { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" },
        ]}
      >
        {children}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  terminalContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  terminalHeader: {
    padding: 8,
  },
  terminalTitle: {
    fontFamily: "SpaceMono",
    fontSize: 14,
  },
  terminalBody: {
    padding: 16,
    gap: 16,
  },
  terminalText: {
    fontFamily: "SpaceMono",
    fontSize: 14,
  },
  envRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 4,
  },
  value: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 14,
  },
  development: {
    backgroundColor: "#4CAF50",
  },
  preview: {
    backgroundColor: "#FF9800",
  },
  production: {
    backgroundColor: "#F44336",
  },
});
