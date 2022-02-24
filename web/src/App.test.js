import { render, screen } from '@testing-library/react';
import TasksOfProject from './pages/projects/[id]/tasks';

test('renders learn react link', () => {
  render(<TasksOfProject />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
