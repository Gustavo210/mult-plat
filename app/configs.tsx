import { router } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet, // Import StyleSheet
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Assuming defaultSizes is correctly imported from its actual path
import { defaultSizes } from "@/utils/defaultSizes";

// Memoized component for individual configuration items
interface ConfigItemProps {
  subKey: string;
  subValue: any;
}

const ConfigItem: React.FC<ConfigItemProps> = React.memo(
  ({ subKey, subValue }) => (
    <View key={subKey} style={configsStyles.itemContainer}>
      <Text style={configsStyles.itemKey}>
        {typeof subKey === "string" ? subKey : JSON.stringify(subKey)}
      </Text>
      <Text style={configsStyles.itemValue}>
        {typeof subValue === "string" ? subValue : JSON.stringify(subValue)}
      </Text>
    </View>
  )
);
ConfigItem.displayName = "ConfigItem";

// Memoized component for each configuration category
interface ConfigCategoryProps {
  categoryKey: string;
  categoryValue: any; // Changed to any to accommodate different types in defaultSizes
}

const ConfigCategory: React.FC<ConfigCategoryProps> = React.memo(
  ({ categoryKey, categoryValue }) => {
    // Ensure categoryValue is an object before calling Object.entries
    if (typeof categoryValue !== "object" || categoryValue === null) {
      return null; // Or render a placeholder/error message
    }
    return (
      <View style={configsStyles.categoryContainer}>
        <Text style={configsStyles.categoryTitle}>{categoryKey}</Text>
        <ScrollView
          horizontal
          contentContainerStyle={configsStyles.scrollViewContent}
          showsHorizontalScrollIndicator={false} // Hide scroll indicator for cleaner UI
        >
          {Object.entries(categoryValue).map(([subKey, subValue]) => (
            <ConfigItem key={subKey} subKey={subKey} subValue={subValue} />
          ))}
        </ScrollView>
      </View>
    );
  }
);
ConfigCategory.displayName = "ConfigCategory";

export default function Configs() {
  // Memoize the back button handler
  const handlePressBack = useCallback(() => {
    router.canGoBack() ? router.back() : router.replace("/");
  }, []);

  // Prepare data for FlatList, ensuring defaultSizes is valid and iterating over its properties
  const layoutData = defaultSizes ? Object.entries(defaultSizes) : [];

  return (
    <View style={configsStyles.container}>
      {/* Back button area */}
      <TouchableOpacity
        onPress={handlePressBack}
        style={configsStyles.backButton}
        accessibilityLabel="Go back to previous screen" // Accessibility improvement
      >
        {/* An empty fragment is used here, consider adding a visible back icon/text */}
        <View />
      </TouchableOpacity>

      {/* Configuration list */}
      <FlatList
        data={layoutData}
        keyExtractor={([key]) => key}
        style={configsStyles.flatList}
        renderItem={({ item: [key, value] }) => (
          <ConfigCategory categoryKey={key} categoryValue={value} />
        )}
        ListEmptyComponent={() => (
          <View style={configsStyles.emptyStateContainer}>
            <Text style={configsStyles.emptyStateText}>
              No configuration data available.
            </Text>
          </View>
        )}
      />
    </View>
  );
}

// Centralized styles
const configsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    backgroundColor: "transparent",
  },
  flatList: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {},
  categoryTitle: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  itemContainer: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  itemKey: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  itemValue: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
