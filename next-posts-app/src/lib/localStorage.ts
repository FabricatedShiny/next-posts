// Utility functions for localStorage persistence
export const saveToLocalStorage = (key: string, value: unknown) => {
	try {
		if (typeof window !== "undefined") {
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (error) {
		console.error("Error saving to localStorage:", error);
	}
};

export const loadFromLocalStorage = (key: string) => {
	try {
		if (typeof window !== "undefined") {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		}
		return null;
	} catch (error) {
		console.error("Error loading from localStorage:", error);
		return null;
	}
};

export const removeFromLocalStorage = (key: string) => {
	try {
		if (typeof window !== "undefined") {
			localStorage.removeItem(key);
		}
	} catch (error) {
		console.error("Error removing from localStorage:", error);
	}
};
