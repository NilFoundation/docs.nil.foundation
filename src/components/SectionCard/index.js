import styles from './styles.module.css'
import { Card, StyledBody } from '@nilfoundation/ui-kit/dist/ui-kit.js'


export default function SectionCard({ Url, text, thumbnail, title }) {
    const GoToSection = (Url) => () => {
        window.open(Url);
    };
    return (
        <Card
            className={'col-3' + ' ' + styles.sectionCard}
            thumbnail={thumbnail}
            border={false}
            title={title}
            headline={true}
            onClick={GoToSection(Url)}
        >
            <StyledBody>
                {text}
            </StyledBody>
        </Card>
    );
}