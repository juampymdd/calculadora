import { useEffect, useRef, useState } from "react";

enum Operator {
  Add = "+",
  Subtract = "-",
  Multiply = "×",
  Divide = "÷",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState<string>("");
  const [number, setNumber] = useState<string>("0");
  const [prevNumber, setPrevNumber] = useState<string>("0");

  const lastOperation = useRef<Operator>(undefined);

  const clean = () => {
    setFormula("0");
    setNumber("0");
    setPrevNumber("0");

    lastOperation.current = undefined;
  };

  const toggleSign = () => {
    if (number.startsWith("-")) {
      setNumber(number.slice(1));
    } else {
      setNumber("-" + number);
    }
  };

  const deleteLast = () => {
    if (number.length === 0) return;

    if (number.length === 2 && number.startsWith("-")) {
      return setNumber("0");
    }

    if (number.length === 1) {
      return setNumber("0");
    }

    if (number.at(-2) === ".") {
      return setNumber(number.slice(0, -2));
    }

    setNumber(number.slice(0, -1));
  };

  const setLastNumber = () => {
    //TODO: Calculate result
    if (number.endsWith(".")) {
      setPrevNumber(number.slice(0, -1));
    }
    setPrevNumber(number);
    setNumber("0");
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.Divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.Multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.Subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.Add;
  };

  const calculateSubresult = () => {
    const [firstValue, operator, secondValue] = formula.split(" ");
    const number1 = Number(firstValue);
    const number2 = Number(secondValue);
    if (isNaN(number2)) return number1;

    switch (operator) {
      case Operator.Add:
        return number1 + number2;
      case Operator.Subtract:
        return number1 - number2;
      case Operator.Multiply:
        return number1 * number2;
      case Operator.Divide:
        if (number2 === 0) {
          console.warn("Cannot divide by zero");
          return number1; // or handle error
        }
        return number1 / number2;
      default:
        throw new Error(`Operation not implemented: ${operator}`);
    }
  };

  const calculateResult = () => {
    const subResult = calculateSubresult();
    setFormula(subResult.toString());
    lastOperation.current = undefined;
    setPrevNumber("0");
  };

  const buildNumber = (numberString: string) => {
    console.log({ numberString });
    // verificar si ya existe el punto decimal
    if (numberString === "." && number.includes(".")) return;

    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") {
        return setNumber(number + numberString);
      }
      //   evaluar si es otro 0 y no hay punto
      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }

      // evaluar si es diferente de 0 no hay punto decimal y es el primer número
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }

      //   evitar el 00000.0
      if (numberString === "0" && !number.includes(".")) return;
    }

    setNumber(number + numberString);
  };

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ").at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    // TODO: calcular el subresultado
    const subResult = calculateSubresult();
    setPrevNumber(subResult.toString());
    setFormula;
  }, [formula]);

  return {
    // Props
    formula,
    number,
    prevNumber,

    // Methods
    setFormula,
    buildNumber,
    clean,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateSubresult,
    calculateResult,
  };
};
