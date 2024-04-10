import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
    React.useEffect(() => {
        window.location.href = useBaseUrl('/docs/main');
    }, []);
    return null;
}