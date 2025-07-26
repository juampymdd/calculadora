import CalculatorButton from "@/components/CalculatorButton";
import ThemeText from "@/components/ThemeText";
import { Colors } from "@/constants/Colors";
import { useCalculator } from "@/hooks/useCalculator";
import globalStyles from "@/styles/global-styles";
import React from "react";
import { View } from "react-native";

const CalculatorApp = () => {
  const {
    formula,
    buildNumber,
    clean,
    toggleSign,
    deleteLast,
    prevNumber,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateSubresult,
    calculateResult,
  } = useCalculator();
  return (
    <View style={globalStyles.calculatorContainer}>
      {/* Main Result */}
      <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
        <ThemeText variant="h1" adjustsFontSizeToFit numberOfLines={1}>
          {formula}
        </ThemeText>
        <ThemeText variant="h2">
          {prevNumber === formula ? "" : prevNumber}
        </ThemeText>
      </View>
      {/* Buttons Container */}
      <View style={globalStyles.row}>
        <CalculatorButton
          color={Colors.lightGray}
          onPress={() => clean()}
          label="C"
        />
        <CalculatorButton
          color={Colors.lightGray}
          onPress={deleteLast}
          label="del"
        />

        <CalculatorButton
          color={Colors.lightGray}
          onPress={toggleSign}
          label="+/-"
        />
        <CalculatorButton
          color={Colors.orange}
          onPress={divideOperation}
          label="÷"
        />
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton onPress={() => buildNumber("7")} label="7" />
        <CalculatorButton onPress={() => buildNumber("8")} label="8" />
        <CalculatorButton onPress={() => buildNumber("9")} label="9" />
        <CalculatorButton
          color={Colors.orange}
          onPress={multiplyOperation}
          label="x"
        />
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton onPress={() => buildNumber("4")} label="4" />
        <CalculatorButton onPress={() => buildNumber("5")} label="5" />
        <CalculatorButton onPress={() => buildNumber("6")} label="6" />
        <CalculatorButton
          color={Colors.orange}
          onPress={subtractOperation}
          label="−"
        />
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton onPress={() => buildNumber("1")} label="1" />
        <CalculatorButton onPress={() => buildNumber("2")} label="2" />
        <CalculatorButton onPress={() => buildNumber("3")} label="3" />
        <CalculatorButton
          color={Colors.orange}
          onPress={addOperation}
          label="+"
        />
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton
          onPress={() => buildNumber("0")}
          label="0"
          doubleSize
        />
        <CalculatorButton onPress={() => buildNumber(".")} label="." />
        <CalculatorButton
          color={Colors.orange}
          onPress={calculateResult}
          label="="
        />
      </View>
    </View>
  );
};

export default CalculatorApp;
