import styles from './App.module.css'

function Section(props) {
    return (
        <section>
            {props.sections.map((v, i) => {
                return (
                    <h4 kew={i}>{v}</h4>
                )
            })}
        </section>
    )
}

export default Section;