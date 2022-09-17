import './formError.css';

function Error(props) {
    return (<div className="invalid-feedback">
        {props.text}
    </div>)
}

export default Error;