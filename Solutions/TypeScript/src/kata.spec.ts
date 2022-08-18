import { beforeEach, describe,  expect, test } from '@jest/globals';
import { Kata } from "./kata";

let fixture: Kata;
let numberOfPrisoners: number;

beforeEach(() => {
    numberOfPrisoners = 100;
    fixture = new Kata(numberOfPrisoners);
});

describe('constructor', () => {
    describe('should create drawers', () => {
        test('for the specified number of prisoners', () => {
            expect(fixture.drawers.length).toEqual(numberOfPrisoners);
        });
        test('filled with prisoner numbers', () => {
            fixture.drawers.forEach(d => {
                expect(Number.isFinite(d)).toBeTruthy();
                expect(d).toBeGreaterThan(0);
                expect(d).toBeLessThanOrEqual(numberOfPrisoners)
            });
        });
        test('with no duplicate prisoner numbers', () => {
            fixture.drawers.sort((a, b) => a - b).forEach((d, i) => {
                expect(d).toEqual(i + 1);
            });
        });
    });
});

describe('simulate', () => {
    test('should be approximately 30% successful with a large number of runs', () => {
        let successes = 0;
        let iterations = 100000;
        for(let i = 0; i < iterations; i++) {
            successes += (fixture.simulate() ? 1 : 0);
        }

        console.log(`${successes} out of ${iterations} runs, or approximately ${successes / iterations * 100}%`);
        expect(successes).toBeGreaterThanOrEqual(.30 * iterations);
        expect(successes).toBeLessThanOrEqual(.32 * iterations);
    });
});
