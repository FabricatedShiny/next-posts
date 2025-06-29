"use client";

import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import UsersDashboard from "../../components/UsersDashboard";

const UsersPage: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const theme = createTheme({
		palette: {
			mode: isDarkMode ? "dark" : "light",
			primary: {
				main: "#1976d2",
			},
			secondary: {
				main: "#dc004e",
			},
			background: {
				default: isDarkMode ? "#121212" : "#f5f5f5",
				paper: isDarkMode ? "#1e1e1e" : "#ffffff",
			},
		},
		typography: {
			fontFamily: "var(--font-geist-sans), sans-serif",
		},
		components: {
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 12,
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						borderRadius: 8,
					},
				},
			},
		},
	});

	const handleToggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UsersDashboard
				onToggleTheme={handleToggleTheme}
				isDarkMode={isDarkMode}
			/>
		</ThemeProvider>
	);
};

export default UsersPage;
