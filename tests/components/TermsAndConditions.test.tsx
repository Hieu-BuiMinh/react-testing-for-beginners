import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("Terms and conditions component", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button", { name: /submit/i }),
    };
  };
  it("should render with correct text and initial state", () => {
    const { button, checkbox, heading } = renderComponent();

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  });
  it("should enable the button when the checkbox is checked", async () => {
    const { button, checkbox } = renderComponent();

    const user = userEvent.setup();

    await user.click(checkbox);

    expect(button).toBeEnabled();
  });
});
