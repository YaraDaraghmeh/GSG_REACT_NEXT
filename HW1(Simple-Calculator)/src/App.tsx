import './App.css'
import { useState } from 'react';
import ScreenComponent from './components/screen/screen.component'
import NumericButton from './components/Numeric-Button/numeric-button,component'
import OperationButton from './components/Operation-Button/operation-Button,component';
function App() {
  const [currentInput, setCurrentInput] = useState('');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumericClick = (value: number) => {
    setCurrentInput((prev) => prev + value.toString());
  };

  const calculateIntermediateResult = () => {
    if (storedValue !== null && operation !== null && currentInput !== '') {
      const currentValue = parseFloat(currentInput);
      let computedResult: number;

      switch (operation) {
        case '+':
          computedResult = storedValue + currentValue;
          break;
        case '-':
          computedResult = storedValue - currentValue;
          break;
        case '*':
          computedResult = storedValue * currentValue;
          break;
        case '/':
          computedResult = currentValue !== 0 ? storedValue / currentValue : NaN;
          break;
        default:
          return storedValue;
      }

      setStoredValue(computedResult);
      setCurrentInput(''); // Clear current input for the next number
      return computedResult;
    }

    return storedValue;
  };

  const handleOperationClick = (op: string) => {
    if (currentInput !== '' || storedValue !== null) {
      if (currentInput !== '') {
        // Perform intermediate calculation before setting the new operation
        calculateIntermediateResult();
      }
      setOperation(op);
      if (storedValue === null && currentInput !== '') {
        setStoredValue(parseFloat(currentInput));
        setCurrentInput('');
      }
    }
  };

  const handleEqualsClick = () => {
    calculateIntermediateResult();
    setOperation(null);
  };

  const handleClear = () => {
    setCurrentInput('');
    setStoredValue(null);
    setOperation(null);
  };

  return (
    <>
      <div className="card">
        <ScreenComponent
          expression={`${storedValue || ''} ${operation || ''} ${currentInput}`}
          result={storedValue !== null ? storedValue : 0}
        />
      </div>
      <div className="ButtonsParent">
        {Array.from({ length: 10 }, (_, i) => (
          <NumericButton key={i} number={i} onClick={handleNumericClick} />
        ))}
        <OperationButton operation="+" onClick={handleOperationClick} />
        <OperationButton operation="-" onClick={handleOperationClick} />
        <OperationButton operation="*" onClick={handleOperationClick} />
        <OperationButton operation="/" onClick={handleOperationClick} />
        <button onClick={handleClear}>Clear</button>
      </div>
      <div className="Equality">
        <OperationButton operation="=" onClick={handleEqualsClick} isEquals={true} />
      </div>
    </>
  );
}

export default App;