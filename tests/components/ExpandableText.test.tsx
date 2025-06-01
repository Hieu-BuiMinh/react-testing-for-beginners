import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("Expandable text component", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render the full text if less than 255 characters", () => {
    const text = "Short text";
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
  it("should truncate text if more than 255 characters", () => {
    const text = "a".repeat(256);

    render(<ExpandableText text={text} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
  it("should expand text when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const user = userEvent.setup();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });
  it("should collapse text when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const user = userEvent.setup();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    await user.click(button);
    await user.click(button);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
});
