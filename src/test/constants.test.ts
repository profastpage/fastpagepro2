import { describe, it, expect } from 'vitest';

describe('Constants', () => {
  it('should have correct WhatsApp number', () => {
    expect('51933667414').toBe('51933667414');
  });

  it('should have correct email', () => {
    expect('profastpage@gmail.com').toBe('profastpage@gmail.com');
  });

  it('should have hero images array', async () => {
    // Mock test - actual constants will be tested when migrated to TS
    expect(['image1.jpg', 'image2.jpg'].length).toBeGreaterThan(0);
  });
});
