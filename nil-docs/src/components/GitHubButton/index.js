import styles from './styles.module.css';
import GitHubLogo from '@site/static/img/gitHubLogo.png';

export default function GitHubButton({ Url }) {
    const GoToGitHub = (Url) => () => {
        window.open(Url);
    };
    return (
        <div className={styles.gitHubButton} onClick={GoToGitHub(Url)}>
            <img src={GitHubLogo} className={styles.gitHubLogo}></img>
            Access the project on GitHub
        </div>
    );
}