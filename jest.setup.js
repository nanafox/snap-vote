import "@testing-library/jest-dom";

// Mock fetch API
global.fetch = jest.fn();

// Suppress console errors during tests
console.error = jest.fn();
