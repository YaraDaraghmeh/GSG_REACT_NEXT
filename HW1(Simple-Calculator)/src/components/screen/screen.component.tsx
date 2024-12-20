import './screen.css';

interface IProps {
    expression: string;
    result: number;
}

const ScreenComponent = (props: IProps) => {
    return (
        <div className="container">
            <div className="expression text-right">{props.expression}</div>
            <div className="result text-right">{props.result || 0}</div>
        </div>
    );
};

export default ScreenComponent;