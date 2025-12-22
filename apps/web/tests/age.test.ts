import { describe, it, expect } from 'vitest';
import { calculateAge } from '../lib/tools/ageCalculator';

describe('Age Calculator', ()=>{
  it('calculates age for known birthdate', ()=>{
    const res = calculateAge('2000-01-01');
    expect(res.years).toBeGreaterThanOrEqual(25);
  });
});
