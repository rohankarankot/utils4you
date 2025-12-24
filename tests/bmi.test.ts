import { describe, it, expect } from 'vitest';
import { calculateBMI } from '../lib/tools/bmiCalculator';

describe('BMI Calculator', ()=>{
  it('calculates BMI', ()=>{
    const bmi = calculateBMI(70, 170);
    expect(bmi).toBeGreaterThan(20);
  });
});
