import { render, screen } from '@testing-library/react';
import TasksOfProjectPage from './pages/projects/[id]/tasks';

test('renders learn react link', () => {
  render(<TasksOfProjectPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
