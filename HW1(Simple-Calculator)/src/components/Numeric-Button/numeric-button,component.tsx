import './numeric-button.css'

interface Iprops {
    number: number; 
    onClick: (value: number) => void;
}

const NumericButton = (props: Iprops) => {
    return (
        <button
            onClick={() => props.onClick( props.number)}
            className="button"
        >
            {props.number}
        </button>
    );
};

export default NumericButton;

