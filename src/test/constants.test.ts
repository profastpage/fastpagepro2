import { describe, it, expect } from 'vitest';

describe('Constants', () => {
  it('should have correct WhatsApp number', async () => {
    const { WHATSAPP_NUMBER } = await import('../utils/constants');
    expect(WHATSAPP_NUMBER).toBe('51919662011');
  });

  it('should have correct email', async () => {
    const { PROFASTPAGE_EMAIL } = await import('../utils/constants');
    expect(PROFASTPAGE_EMAIL).toBe('profastpage@gmail.com');
  });

  it('should have hero images array', async () => {
    const { HERO_IMAGES } = await import('../utils/constants');
    expect(HERO_IMAGES).toBeInstanceOf(Array);
    expect(HERO_IMAGES.length).toBeGreaterThan(0);
  });
});
