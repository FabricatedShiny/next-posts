"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import theme from "./theme";

export default function MUIThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StyledComponentsRegistry>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledComponentsRegistry>
	);
}
