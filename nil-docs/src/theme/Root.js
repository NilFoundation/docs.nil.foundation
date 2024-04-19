import { BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { createTheme } from "@nilfoundation/ui-kit/dist/ui-kit.js";
import { Client, Server } from 'styletron-engine-atomic'

const engine =
    typeof window === 'undefined'
        ? new Server()
        : new Client()

const { theme } = createTheme(engine);


export default function Root({ children }) {
    return <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
            {children}
        </BaseProvider>
    </StyletronProvider>

}