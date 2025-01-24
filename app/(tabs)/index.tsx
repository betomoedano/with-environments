import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Updates from "expo-updates";
import { useEffect } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Terminal } from "@/components/Terminal";
import * as Application from "expo-application";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    Updates.checkForUpdateAsync();
  }, []);

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync();
    } catch (error) {
      Alert.alert(
        "Update Failed",
        "Failed to download the update. Please try again."
      );
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Terminal title="Environment Info">
          <ThemedView style={styles.envRow}>
            <ThemedText
              style={[styles.terminalText, { color: isDark ? "#fff" : "#000" }]}
            >
              $ API_URL=
            </ThemedText>
            <ThemedText
              style={[
                styles.terminalText,
                styles.value,
                { color: isDark ? "#fff" : "#000" },
              ]}
              numberOfLines={1}
            >
              {process.env.EXPO_PUBLIC_API_URL ?? "unknown"}
            </ThemedText>
          </ThemedView>
        </Terminal>

        <Terminal title="Application Info" style={{ marginTop: 16 }}>
          <ThemedView style={styles.envRow}>
            <ThemedText
              style={[styles.terminalText, { color: isDark ? "#fff" : "#000" }]}
            >
              $ APP_ID=
            </ThemedText>
            <ThemedText
              style={[
                styles.terminalText,
                styles.value,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {Application.applicationId}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.envRow}>
            <ThemedText
              style={[styles.terminalText, { color: isDark ? "#fff" : "#000" }]}
            >
              $ APP_NAME=
            </ThemedText>
            <ThemedText
              style={[
                styles.terminalText,
                styles.value,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {Application.applicationName}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.envRow}>
            <ThemedText
              style={[styles.terminalText, { color: isDark ? "#fff" : "#000" }]}
            >
              $ VERSION=
            </ThemedText>
            <ThemedText
              style={[
                styles.terminalText,
                styles.value,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {Application.nativeApplicationVersion}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.envRow}>
            <ThemedText
              style={[styles.terminalText, { color: isDark ? "#fff" : "#000" }]}
            >
              $ BUILD=
            </ThemedText>
            <ThemedText
              style={[
                styles.terminalText,
                styles.value,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {Application.nativeBuildVersion}
            </ThemedText>
          </ThemedView>
        </Terminal>

        <Terminal title="EAS Updates" style={{ marginTop: 16 }}>
          {Updates.channel === "" ? (
            <ThemedView>
              <ThemedText>
                Expo Go and Development Builds are not set to a specific channel
                and can run any updates compatible with their native runtime.
              </ThemedText>
              <ThemedText style={{ marginTop: 8 }}>
                If you want to test an update, go to Home &gt; Extensions &gt;
                Select the update you want to test. Make sure to login to your
                expo account in the app.
              </ThemedText>
            </ThemedView>
          ) : (
            <>
              <ThemedView style={styles.envRow}>
                <ThemedText
                  style={[
                    styles.terminalText,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  $ CHANNEL=
                </ThemedText>
                <ThemedText
                  style={[
                    styles.terminalText,
                    styles.value,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  {Updates.channel ?? "default"}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.envRow}>
                <ThemedText
                  style={[
                    styles.terminalText,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  $ UPDATE_ID=
                </ThemedText>
                <ThemedText
                  style={[
                    styles.terminalText,
                    styles.value,
                    { color: isDark ? "#fff" : "#000", fontSize: 10 },
                  ]}
                >
                  {Updates.updateId ?? "none"}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.envRow}>
                <ThemedText
                  style={[
                    styles.terminalText,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  $ IS_EMBEDDED_LAUNCH=
                </ThemedText>
                <ThemedText
                  style={[
                    styles.terminalText,
                    styles.value,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  {Updates.isEmbeddedLaunch ? "true" : "false"}
                </ThemedText>
              </ThemedView>
            </>
          )}

          {isUpdateAvailable ? (
            <TouchableOpacity
              style={[
                styles.updateButton,
                { backgroundColor: isDark ? "#333" : "#E0E0E0" },
              ]}
              onPress={handleUpdate}
            >
              <ThemedText style={styles.updateButtonText}>
                Download and install update
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.updateButton,
                { backgroundColor: isDark ? "#333" : "#E0E0E0" },
              ]}
              onPress={() =>
                Alert.alert(
                  "✅ All clear!",
                  "Even the bugs are taking a day off!"
                )
              }
            >
              <ThemedText style={styles.updateButtonText}>
                No bug fixes available
              </ThemedText>
            </TouchableOpacity>
          )}
        </Terminal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  updateButton: {
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  updateButtonText: {
    fontSize: 14,
    fontFamily: "SpaceMono",
  },
});
