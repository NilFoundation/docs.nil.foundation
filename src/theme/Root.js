import { BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { createTheme } from "@nilfoundation/ui-kit/dist/ui-kit.js";
import { Client, Server } from 'styletron-engine-atomic'



export default function Root({ children }) {

    return <>{children}</>

}