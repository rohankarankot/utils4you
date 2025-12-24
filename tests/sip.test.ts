import { describe, it, expect } from 'vitest';
import { calculateSIP } from '../lib/tools/sipCalculator';

describe('SIP Calculator', ()=>{
  it('calculates future value for SIP', ()=>{
    const fv = calculateSIP(5000, 12, 10);
    expect(fv).toBeGreaterThan(5000*12*10);
  });
});
