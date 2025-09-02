# SnapVote - Test Suite

This directory contains tests for the SnapVote application, focusing on validating component behavior and ensuring the application works as expected.

## Test Structure

The tests are organized following a structure that mirrors the main application:

- `__tests__/components/` - Tests for React components
- `__tests__/hooks/` - Tests for custom hooks
- `__tests__/lib/` - Tests for utility functions and libraries

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```

## Poll Creation Form Tests

The tests for the poll creation form (`__tests__/components/polls/create-poll-form.test.js`) verify:

### Happy Path
- Successfully submits the form with valid data
- Creates a poll with the specified title, description, and questions
- Handles different question types (single-choice, multiple-choice, text, rating)
- Properly formats the request payload for the API

### Validation
- Prevents submission when the poll title is missing
- Ensures that questions have text
- Validates that choice questions have at least two options
- Checks that option text is provided for choice questions

### Edge Cases
- Handles the maximum question limit (20)
- Handles the maximum option limit per question (10)
- Manages question type switching and maintains required status
- Validates expiration date format

### UI Interactions
- Adds and removes questions
- Adds and removes options for choice questions
- Changes question types and updates the UI accordingly
- Disables the submit button during form submission
- Shows appropriate loading states

### Error Handling
- Properly handles API errors during submission
- Displays error messages to the user

## Writing New Tests

When writing new tests:

1. Mock any external dependencies (API calls, router, etc.)
2. Test both happy paths and error scenarios
3. Verify that validation rules are enforced
4. Check that UI interactions work as expected
5. Ensure error states are handled gracefully

## Future Improvements

- Add integration tests that test the interaction between components
- Add end-to-end tests using Cypress or Playwright
- Implement visual regression testing for UI components