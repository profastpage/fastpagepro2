import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhatsAppButton } from '../components/WhatsAppButton';

describe('WhatsAppButton', () => {
  const defaultProps = {
    text: 'Test Button',
    href: '#test',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the button with correct text', () => {
    render(<WhatsAppButton {...defaultProps} />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render with primary variant by default', () => {
    const { container } = render(<WhatsAppButton {...defaultProps} />);
    expect(container.firstChild).toHaveClass('bg-stone-950');
  });

  it('should render with outline variant when specified', () => {
    const { container } = render(
      <WhatsAppButton {...defaultProps} variant="outline" />
    );
    expect(container.firstChild).toHaveClass('bg-transparent');
  });

  it('should render with small size when specified', () => {
    const { container } = render(
      <WhatsAppButton {...defaultProps} size="small" />
    );
    expect(container.firstChild).toHaveClass('px-6', 'py-3', 'text-xs');
  });

  it('should render with external link attributes when href is external', () => {
    render(<WhatsAppButton {...defaultProps} href="https://example.com" />);
    const link = screen.getByText('Test Button').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
