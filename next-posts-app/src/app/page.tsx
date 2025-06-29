"use client";

import React from "react";
import {
	Box,
	Typography,
	Button,
	Card,
	CardContent,
	Stack,
	Container,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
	People as PeopleIcon,
	Dashboard as DashboardIcon,
} from "@mui/icons-material";

export default function Home() {
	const router = useRouter();

	const handleNavigateToUsers = () => {
		router.push("/users");
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Box textAlign="center" mb={4}>
				<Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
					Welcome to Next Posts App
				</Typography>
				<Typography variant="h6" color="text.secondary" paragraph>
					Discover users and explore their posts with our interactive dashboard
				</Typography>
			</Box>

			<Stack spacing={4} alignItems="center">
				{/* Users Dashboard Card */}
				<Card
					elevation={3}
					sx={{
						"maxWidth": 600,
						"width": "100%",
						"transition": "transform 0.2s, box-shadow 0.2s",
						"&:hover": {
							transform: "translateY(-4px)",
							boxShadow: 6,
						},
					}}>
					<CardContent sx={{ p: 4 }}>
						<Stack direction="row" alignItems="center" spacing={2} mb={2}>
							<DashboardIcon color="primary" sx={{ fontSize: 40 }} />
							<Typography variant="h5" component="h2" fontWeight="bold">
								Users Dashboard
							</Typography>
						</Stack>

						<Typography variant="body1" color="text.secondary" paragraph>
							Browse through a comprehensive list of users, search by name or
							email, sort by different criteria, and view their posts in an
							interactive modal.
						</Typography>

						<Stack direction="row" spacing={1} mb={3}>
							<Typography
								variant="body2"
								sx={{
									backgroundColor: "primary.main",
									color: "primary.contrastText",
									px: 1.5,
									py: 0.5,
									borderRadius: 1,
									fontSize: "0.75rem",
								}}>
								✨ Search & Filter
							</Typography>
							<Typography
								variant="body2"
								sx={{
									backgroundColor: "secondary.main",
									color: "secondary.contrastText",
									px: 1.5,
									py: 0.5,
									borderRadius: 1,
									fontSize: "0.75rem",
								}}>
								📊 Sort Options
							</Typography>
							<Typography
								variant="body2"
								sx={{
									backgroundColor: "success.main",
									color: "success.contrastText",
									px: 1.5,
									py: 0.5,
									borderRadius: 1,
									fontSize: "0.75rem",
								}}>
								📱 Responsive
							</Typography>
						</Stack>

						<Button
							variant="contained"
							size="large"
							fullWidth
							onClick={handleNavigateToUsers}
							startIcon={<PeopleIcon />}
							sx={{
								py: 1.5,
								fontSize: "1.1rem",
								fontWeight: "bold",
								borderRadius: 2,
							}}>
							Explore Users Dashboard
						</Button>
					</CardContent>
				</Card>
			</Stack>
		</Container>
	);
}
