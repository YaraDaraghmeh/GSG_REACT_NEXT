import './operation-button.css'

interface IProps  {
    operation: string;
    onClick: (operation: string) => void;
    isEquals?: boolean;
  }


const OperationButton = (props: IProps) => {
    return (
        <button
        onClick={() => props.onClick(props.operation)}
        
        className={`operation-button ${props.isEquals ? "equals-button" : "operation-default"}`}
      >
        {props.operation}
      </button>
    );
};

export default OperationButton;