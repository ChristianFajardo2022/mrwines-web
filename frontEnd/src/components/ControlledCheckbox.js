import "../styles/ControlledCheckbox.css"

export default function ControlledCheckbox(props) {
    
    return (
        <div className="container4">
            <ul className="ks-cboxtags">
                <li><input type="checkbox" value={props.type} id={props.type} /><label htmlFor={props.type}>{props.type}</label></li>
            </ul>
        </div>
    )

}