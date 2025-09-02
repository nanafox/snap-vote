import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreatePollForm } from "@/components/polls/create-poll-form";
import { ToastProvider } from "@/hooks/use-toast";

// Mock useToast hook
jest.mock("@/hooks/use-toast");

// Mock fetch to return success or failure responses
const mockFetchSuccess = () => {
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ success: true, poll: { id: "test-poll-id" } }),
  });
};

const mockFetchFailure = (errorMessage = "Failed to create poll") => {
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ success: false, message: errorMessage }),
  });
};

describe("CreatePollForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ToastProvider>
        <CreatePollForm />
      </ToastProvider>
    );
  };

  // Helper to fill in a valid form
  const fillValidForm = async (user) => {
    // Fill required fields
    await user.type(screen.getByLabelText(/Poll Title/i), "Test Poll");

    // Fill question text
    await user.type(screen.getByLabelText(/Question Text/i), "What is your favorite color?");

    // Fill options
    const optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
    await user.type(optionInputs[0], "Red");
    await user.type(optionInputs[1], "Blue");
  };

  describe("Form Rendering", () => {
    it("renders the form with default values", () => {
      renderComponent();

      // Basic form elements should be present
      expect(screen.getByLabelText(/Poll Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Expiration Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Public Poll/i)).toBeInTheDocument();

      // Default question elements
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Question Text/i)).toBeInTheDocument();

      // Default question type should be single choice
      expect(screen.getByText(/Single Choice/i)).toBeInTheDocument();

      // Two empty options should be present by default
      const optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      expect(optionInputs).toHaveLength(2);

      // Required checkbox should be checked by default
      const requiredCheckbox = screen.getByLabelText(/Required question/i);
      expect(requiredCheckbox).toBeChecked();

      // Public poll checkbox should be checked by default
      const publicCheckbox = screen.getByLabelText(/Public Poll/i);
      expect(publicCheckbox).toBeChecked();
    });
  });

  describe("Question Management", () => {
    it("adds a new question when clicking the 'Add Question' button", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Initially there should be one question
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Question 2/i)).not.toBeInTheDocument();

      // Click the 'Add Question' button
      await user.click(screen.getByText(/Add Question/i));

      // Now there should be two questions
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Question 2/i)).toBeInTheDocument();
    });

    it("removes a question when clicking the delete button", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Add a second question
      await user.click(screen.getByText(/Add Question/i));
      expect(screen.getByText(/Question 2/i)).toBeInTheDocument();

      // Get delete buttons (trash icons)
      const deleteButtons = screen.getAllByRole("button", { name: "" }); // Trash icons don't have accessible names

      // Delete the second question
      await user.click(deleteButtons[1]); // Second trash icon

      // Now there should only be one question
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Question 2/i)).not.toBeInTheDocument();
    });

    it("prevents deleting the last question", async () => {
      const user = userEvent.setup();
      renderComponent();

      // There should be one question
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();

      // Get delete button for the only question
      const deleteButton = screen.getByRole("button", { name: "" }); // Trash icon

      // Try to delete the only question
      await user.click(deleteButton);

      // The question should still be there
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
    });
  });

  describe("Option Management", () => {
    it("adds a new option when clicking the 'Add Option' button", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Initially there should be two options
      let optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      expect(optionInputs).toHaveLength(2);

      // Find and click the 'Add Option' button
      const addOptionButton = screen.getByRole("button", { name: /Add Option/i });
      await user.click(addOptionButton);

      // Now there should be three options
      optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      expect(optionInputs).toHaveLength(3);
    });

    it("removes an option when clicking the delete button", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Add a third option
      const addOptionButton = screen.getByRole("button", { name: /Add Option/i });
      await user.click(addOptionButton);

      // Now there should be three options
      let optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      expect(optionInputs).toHaveLength(3);

      // Get delete buttons for options
      const deleteOptionButtons = screen.getAllByRole("button", { name: "" }); // The small trash icons

      // Delete the third option (last trash icon related to options)
      await user.click(deleteOptionButtons[deleteOptionButtons.length - 1]);

      // Now there should be two options again
      optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      expect(optionInputs).toHaveLength(2);
    });

    it("prevents removing options when only two remain", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Initially there should be two options
      let optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      expect(optionInputs).toHaveLength(2);

      // Get delete buttons for options
      const deleteOptionButtons = screen.getAllByRole("button", { name: "" }); // The small trash icons

      // Try to delete an option
      await user.click(deleteOptionButtons[deleteOptionButtons.length - 1]);

      // There should still be two options
      optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      expect(optionInputs).toHaveLength(2);
    });
  });

  describe("Question Type Switching", () => {
    it("changes question type to text and removes options", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Initially there should be options for single-choice
      expect(screen.getAllByPlaceholderText(/Option \d+/)).toHaveLength(2);

      // Open the question type dropdown
      await user.click(screen.getByRole("button", { name: /Single Choice/i }));

      // Select "Text Response"
      await user.click(screen.getByText(/Text Response/i));

      // Options should be removed and text response message should appear
      expect(screen.queryAllByPlaceholderText(/Option \d+/)).toHaveLength(0);
      expect(
        screen.getByText(/Text questions allow participants to provide open-ended responses./i)
      ).toBeInTheDocument();
    });

    it("changes question type to rating and shows rating info", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Open the question type dropdown
      await user.click(screen.getByRole("button", { name: /Single Choice/i }));

      // Select "Rating Scale"
      await user.click(screen.getByText(/Rating Scale/i));

      // Rating scale info should appear
      expect(screen.getByText(/Rating questions will display a 1-5 star rating scale/i)).toBeInTheDocument();
    });

    it("changes from text to multiple choice and adds options", async () => {
      const user = userEvent.setup();
      renderComponent();

      // First change to text
      await user.click(screen.getByRole("button", { name: /Single Choice/i }));
      await user.click(screen.getByText(/Text Response/i));

      // No options should be present
      expect(screen.queryAllByPlaceholderText(/Option \d+/)).toHaveLength(0);

      // Then change to multiple choice
      await user.click(screen.getByRole("button", { name: /Text Response/i }));
      await user.click(screen.getByText(/Multiple Choice/i));

      // Options should be added back
      expect(screen.getAllByPlaceholderText(/Option \d+/)).toHaveLength(2);
    });
  });

  describe("Form Validation", () => {
    it("shows error when submitting without a poll title", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Submit without filling anything
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // Title error should appear
      expect(await screen.findByText(/Poll title is required/i)).toBeInTheDocument();
    });

    it("shows error when submitting without question text", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Fill in title but not question text
      await user.type(screen.getByLabelText(/Poll Title/i), "Test Poll");

      // Submit form
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // Question text error should appear
      expect(await screen.findByText(/Question text is required/i)).toBeInTheDocument();
    });

    it("shows error when submitting with empty options", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Fill in title and question text but not options
      await user.type(screen.getByLabelText(/Poll Title/i), "Test Poll");
      await user.type(screen.getByLabelText(/Question Text/i), "What is your favorite color?");

      // Submit form
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // Option error should appear
      expect(await screen.findByText(/Option text is required/i)).toBeInTheDocument();
    });

    it("validates choice questions must have at least 2 options", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Fill in title and question text
      await user.type(screen.getByLabelText(/Poll Title/i), "Test Poll");
      await user.type(screen.getByLabelText(/Question Text/i), "What is your favorite color?");

      // Fill only first option
      const optionInputs = screen.getAllByPlaceholderText(/Option \d+/);
      await user.type(optionInputs[0], "Red");

      // Submit form
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // Option error should appear
      expect(await screen.findByText(/Option text is required/i)).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("successfully submits the form with valid data", async () => {
      const user = userEvent.setup();
      renderComponent();
      mockFetchSuccess();

      // Fill all required fields
      await fillValidForm(user);

      // Submit form
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // Wait for form submission
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/polls", expect.any(Object));
      });

      // Verify request data
      const fetchCall = global.fetch.mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.title).toBe("Test Poll");
      expect(requestBody.questions[0].text).toBe("What is your favorite color?");
      expect(requestBody.questions[0].options).toContain("Red");
      expect(requestBody.questions[0].options).toContain("Blue");
    });

    it("handles API errors during submission", async () => {
      const user = userEvent.setup();
      renderComponent();
      mockFetchFailure("Server error occurred");

      // Fill all required fields
      await fillValidForm(user);

      // Submit form
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // Wait for form submission
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/polls", expect.any(Object));
      });

      // Error should be logged
      expect(console.error).toHaveBeenCalled();
    });

    it("disables submit button during submission", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Mock a slow network response
      global.fetch.mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              json: () => Promise.resolve({ success: true, poll: { id: "test-poll-id" } }),
            });
          }, 100);
        });
      });

      // Fill all required fields
      await fillValidForm(user);

      // Submit form
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // Button should be disabled and show "Creating..."
      expect(screen.getByText("Creating...")).toBeInTheDocument();
      expect(screen.getByText("Creating...").closest("button")).toBeDisabled();
    });
  });

  describe("Edge Cases", () => {
    it("handles max question limit (20)", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Add 19 more questions (to reach the max of 20)
      for (let i = 0; i < 19; i++) {
        await user.click(screen.getByText(/Add Question/i));
      }

      // The Add Question button should show 20/20
      expect(screen.getByText(/Add Question \(20\/20\)/i)).toBeInTheDocument();

      // Try to add one more question
      await user.click(screen.getByText(/Add Question/i));

      // Still should have 20 questions (not 21)
      expect(screen.getByText(/Add Question \(20\/20\)/i)).toBeInTheDocument();
      expect(screen.queryByText(/Question 21/i)).not.toBeInTheDocument();
    });

    it("handles max option limit (10) per question", async () => {
      const user = userEvent.setup();
      renderComponent();

      const addOptionButton = screen.getByRole("button", { name: /Add Option/i });

      // Add 8 more options (to reach the max of 10)
      for (let i = 0; i < 8; i++) {
        await user.click(addOptionButton);
      }

      // Should have 10 options total
      expect(screen.getAllByPlaceholderText(/Option \d+/)).toHaveLength(10);

      // Try to add one more option
      await user.click(addOptionButton);

      // Still should have 10 options (not 11)
      expect(screen.getAllByPlaceholderText(/Option \d+/)).toHaveLength(10);
    });

    it("validates expiration date format", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Fill valid form data
      await fillValidForm(user);

      // Set an invalid expiration date format
      const expirationInput = screen.getByLabelText(/Expiration Date/i);
      await user.clear(expirationInput);
      await user.type(expirationInput, "invalid-date");

      // Submit form - should still work because expiresAt is optional
      // and the native date input will handle validation
      mockFetchSuccess();
      await user.click(screen.getByRole("button", { name: /Create Poll/i }));

      // API should be called
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it("keeps required status when switching question types", async () => {
      const user = userEvent.setup();
      renderComponent();

      // Check that required is checked by default
      expect(screen.getByLabelText(/Required question/i)).toBeChecked();

      // Change question type to text
      await user.click(screen.getByRole("button", { name: /Single Choice/i }));
      await user.click(screen.getByText(/Text Response/i));

      // Required checkbox should still be checked
      expect(screen.getByLabelText(/Required question/i)).toBeChecked();
    });
  });
});
