import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@src/pages';
import '@testing-library/jest-dom';

const ProblematicComponent = () => {
  throw new Error('Test Error');
};

test('ErrorBoundary catches errors and renders fallback UI', () => {
  render(
    <ErrorBoundary fallback={<ErrorPage />}>
      <ProblematicComponent />
    </ErrorBoundary>
  );

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  expect(screen.getByText('The page you are looking for does not exist. It might have been moved or deleted.')).toBeInTheDocument();
});

test('ErrorBoundary can reset after error', () => {
  const { getByText, rerender } = render(
    <ErrorBoundary fallback={<ErrorPage />}>
      <ProblematicComponent />
    </ErrorBoundary>
  );

  // Expect the fallback UI to be rendered
  expect(getByText('404')).toBeInTheDocument();

  // Simulate a reset
  rerender(
    <ErrorBoundary fallback={<ErrorPage />}>
      <div>Normal Component</div>
    </ErrorBoundary>
  );

  // Expect the normal component to be rendered after reset
  expect(screen.queryByText('404')).not.toBeInTheDocument();
  expect(screen.getByText('Normal Component')).toBeInTheDocument();
});
