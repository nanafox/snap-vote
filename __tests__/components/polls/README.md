# Poll Creation Form Tests

This directory contains tests for the poll creation functionality in SnapVote, focusing on validating the `CreatePollForm` component behavior and ensuring the form validation works correctly.

## Test Coverage

The tests validate the following aspects of the poll creation form:

### Validation Tests
- **Required Fields**: Tests that polls cannot be created without a title.
- **Question Text**: Verifies that each question must have text.
- **Options for Choice Questions**: Ensures that single-choice and multiple-choice questions require at least two options.
- **Option Text**: Validates that each option must have text content.

### Form Interaction Tests
- **Adding/Removing Questions**: Tests the ability to add new questions and remove existing ones.
- **Maximum Questions**: Verifies the limit of 20 questions per poll.
- **Adding/Removing Options**: Tests the ability to add options to choice questions and remove them.
- **Minimum/Maximum Options**: Ensures choice questions maintain at least 2 and at most 10 options.

### Question Type Tests
- **Type Switching**: Tests changing between different question types (single-choice, multiple-choice, text, rating).
- **Option Management**: Verifies that options are added/removed appropriately when switching question types.
- **UI Updates**: Confirms the UI changes correctly when question types change.

### Form Submission Tests
- **Happy Path**: Tests successful form submission with valid data.
- **API Integration**: Verifies the correct API endpoint is called with properly formatted data.
- **Error Handling**: Tests handling of API errors during submission.
- **Loading States**: Confirms the submit button is disabled during submission and shows appropriate loading text.

### Edge Cases
- **Expiration Date**: Tests validation of the optional expiration date.
- **Public/Private Setting**: Verifies the public poll setting can be toggled.
- **Required Flag**: Tests that the required flag for questions persists when changing question types.

## Running the Tests

To run these specific tests:

```bash
# Run just the poll creation form tests
npm test -- components/polls/create-poll-form.test.js

# Run with coverage report
npm test -- components/polls/create-poll-form.test.js --coverage
```

## Mocking Strategy

The tests use the following mocking approach:

1. **UI Components**: All UI components (buttons, inputs, etc.) are mocked to simplify testing.
2. **Next.js Router**: The router is mocked to test navigation.
3. **API Calls**: Fetch is mocked to simulate successful and failed API responses.
4. **Toast Notifications**: The toast system is mocked to verify user feedback.

## Potential Improvements

Future test enhancements could include:

- **Snapshot Testing**: Add snapshot tests for the form's rendered output.
- **User Flow Testing**: Create more comprehensive user flow tests that combine multiple interactions.
- **Visual Regression**: Implement visual regression tests to catch UI changes.
- **Accessibility Testing**: Add tests for keyboard navigation and screen reader compatibility.
- **Performance Testing**: Add tests for form performance with many questions and options.