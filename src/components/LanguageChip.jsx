export default function LanguageChip(props) {

    const styles = {
        color: props.color,
        backgroundColor: props.backgroundColor
    }

    return (<span className="language-chip"
        style={styles}>
        {props.name}
    </span>)
}