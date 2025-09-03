import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreatePollForm } from "@/components/polls/create-poll-form";

// Minimal mocks for required UI and hooks
jest.mock("@/components/ui/button", () => ({ Button: (props) => <button {...props} /> }));
jest.mock("@/components/ui/input", () => ({ Input: (props) => <input {...props} /> }));
jest.mock("@/components/ui/textarea", () => ({ Textarea: (props) => <textarea {...props} /> }));
jest.mock("@/components/ui/label", () => ({ Label: (props) => <label {...props} /> }));
jest.mock("@/components/ui/card", () => ({
  Card: (props) => <div {...props} />,
  CardContent: (props) => <div {...props} />,
  CardHeader: (props) => <div {...props} />,
}));
jest.mock("@/components/ui/badge", () => ({ Badge: (props) => <span {...props} /> }));
jest.mock("@/components/ui/checkbox", () => ({ Checkbox: (props) => <input type="checkbox" {...props} /> }));
jest.mock("@/components/ui/select", () => ({
  Select: (props) => <div {...props} />,
  SelectContent: (props) => <div {...props} />,
  SelectItem: (props) => <div {...props} />,
  SelectTrigger: (props) => <button {...props} />,
  SelectValue: (props) => <span {...props} />,
}));
jest.mock("@/components/ui/form", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { FormProvider, useFormContext, Controller } = require("react-hook-form");

  const get = (obj, path) => {
    return path.split(".").reduce((r, k) => r?.[k], obj);
  };

  const FormFieldContext = React.createContext({});

  const Form = FormProvider;

  const FormField = ({ name, control, render }) => (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} control={control} render={render} />
    </FormFieldContext.Provider>
  );

  const useFormField = () => React.useContext(FormFieldContext);

  const FormItem = React.forwardRef((props, ref) => <div ref={ref} {...props} />);
  FormItem.displayName = "FormItem";

  const FormLabel = React.forwardRef((props, ref) => <label ref={ref} {...props} />);
  FormLabel.displayName = "FormLabel";

  const FormControl = React.forwardRef((props, ref) => <div ref={ref}>{props.children}</div>);
  FormControl.displayName = "FormControl";

  const FormDescription = React.forwardRef((props, ref) => <p ref={ref} {...props} />);
  FormDescription.displayName = "FormDescription";

  const FormMessage = React.forwardRef((props, ref) => {
    const { name } = useFormField();
    const {
      formState: { errors },
    } = useFormContext();
    const error = get(errors, name);
    const body = error ? String(error.message) : null;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} {...props}>
        {body}
      </p>
    );
  });
  FormMessage.displayName = "FormMessage";

  return {
    useFormField,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  };
});
jest.mock("lucide-react", () => new Proxy({}, { get: () => () => <svg /> }));
jest.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: jest.fn() }) }));

describe("CreatePollForm (short tests)", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ success: true, poll: { id: "1" } }) })
    );
  });

  it("renders the form", () => {
    render(<CreatePollForm />);
    expect(screen.getByText(/Poll Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Questions/i)).toBeInTheDocument();
  });

  it("can add a question", async () => {
    render(<CreatePollForm />);
    const addBtn = screen.getByRole("button", { name: /Add Question/i });
    await userEvent.click(addBtn);
    expect(screen.getByText(/Question 2/i)).toBeInTheDocument();
  });

  it("can add an option to a question", async () => {
    render(<CreatePollForm />);
    const addOptionBtn = screen.getByRole("button", { name: /Add Option/i });
    await userEvent.click(addOptionBtn);
    expect(screen.getAllByPlaceholderText(/Option/)).toHaveLength(3);
  });

  it("shows validation error if required fields are empty", async () => {
    render(<CreatePollForm />);
    await userEvent.click(screen.getByRole("button", { name: /Create Poll/i }));
    expect(await screen.findByText(/Poll title is required/i)).toBeInTheDocument();
  });

  it("submits valid data", async () => {
    render(<CreatePollForm />);
    await userEvent.type(screen.getByPlaceholderText(/title/i), "My Poll");
    await userEvent.type(screen.getByPlaceholderText(/question here/i), "What?");
    const options = screen.getAllByPlaceholderText(/Option/);
    await userEvent.type(options[0], "A");
    await userEvent.type(options[1], "B");
    await userEvent.click(screen.getByRole("button", { name: /Create Poll/i }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
