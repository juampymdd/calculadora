import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/styles/global-styles";
import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";

interface Props {
  label: string;
  color?: string;
  blackText?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
}

const CalculatorButton = ({
  label,
  onPress,
  color = Colors.darkGray,
  blackText = false,
  doubleSize = false,
}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
        style={({ pressed }) => ({
          ...globalStyles.button,
          backgroundColor: color,
          opacity: pressed ? 0.7 : 1,
          width: doubleSize ? 180 : 80,
        })}
      >
        <Text
          style={{
            ...globalStyles.buttonText,
            color: blackText ? Colors.textSecondary : Colors.textPrimary,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default CalculatorButton;
