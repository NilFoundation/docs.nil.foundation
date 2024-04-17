import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageNilProducts from '@site/src/components/HomepageFeatures';
import { BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { createTheme } from "@nilfoundation/ui-kit/dist/ui-kit.js";

const engine = new Styletron();
const { theme } = createTheme(engine);

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>
        <Layout
          title={`${siteConfig.title}`}
          description="The Documentation Portal for =nil; Foundation, a leading developer of zero-knowledge infrastructure and Ethereum scalability solutions.">
          <main>
            <HomepageNilProducts />
          </main>
        </Layout >
      </BaseProvider>
    </StyletronProvider>
  );
}
