"use client";

import { Button, Container, Typography, Paper, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
	increment,
	decrement,
	incrementByAmount,
} from "../features/counter/counterSlice";

export default function CounterDemo() {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();

	return (
		<Container maxWidth="sm" sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
				<Typography variant="h3" component="h1" gutterBottom color="primary">
					Redux + Material UI Demo
				</Typography>

				<Box sx={{ my: 4 }}>
					<Typography variant="h2" component="div" sx={{ mb: 3 }}>
						{count}
					</Typography>

					<Box
						sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
						<Button
							variant="contained"
							startIcon={<Remove />}
							onClick={() => dispatch(decrement())}
							color="secondary">
							Decrement
						</Button>

						<Button
							variant="contained"
							startIcon={<Add />}
							onClick={() => dispatch(increment())}
							color="primary">
							Increment
						</Button>
					</Box>

					<Button
						variant="outlined"
						onClick={() => dispatch(incrementByAmount(5))}
						size="large">
						Add 5
					</Button>
				</Box>

				<Typography variant="body1" color="text.secondary">
					This demo showcases Redux Toolkit state management with Material UI
					components.
				</Typography>
			</Paper>
		</Container>
	);
}
