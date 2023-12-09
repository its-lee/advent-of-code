/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: '**/*.spec.js',
    testTimeout: 5 * 60 * 1000
  }
});
