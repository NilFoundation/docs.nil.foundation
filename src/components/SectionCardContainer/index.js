import styles from './styles.module.css'

export default function SectionCardContainer({ children }) {
    return (
        <div className={'row' + ' ' + styles.sectionCardContainer}>
            {children}
        </div>
    );
}