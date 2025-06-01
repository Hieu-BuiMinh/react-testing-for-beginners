import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("User list component", () => {
  it("should render no user if users array is empty", () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users available/i)).toBeInTheDocument();
  });
  it("should render a list of user if users array is not empty", () => {
    const users: User[] = [
      { id: 1, name: "John", isAdmin: true },
      { id: 2, name: "Jim", isAdmin: true },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', `/users/${user.id}`)
    });
  });
});
