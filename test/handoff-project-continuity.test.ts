import { describe, expect, it } from 'vitest';
import { HANDOFF_BRIEF_RULES, nativeHandoffPrompt } from '../src/main/session/handoff-prompt.js';

describe('project-aware continuation handoff', () => {
  it('defers to an explicit Project continuation contract instead of forcing coding semantics', () => {
    expect(HANDOFF_BRIEF_RULES).toContain('Continuation Recovery / handoff contract');
    expect(HANDOFF_BRIEF_RULES).toContain('that contract is authoritative');
    expect(HANDOFF_BRIEF_RULES).toContain('working mind');
    expect(HANDOFF_BRIEF_RULES).toContain('live cognitive position');
    expect(HANDOFF_BRIEF_RULES).toContain('Working hypotheses');
    expect(HANDOFF_BRIEF_RULES).toContain('unknowns are deliberately still unknown');
    expect(HANDOFF_BRIEF_RULES).toContain('reasoning edge');
    expect(HANDOFF_BRIEF_RULES).toContain('Fresh Onboarding');
  });

  it('remains valid for coding while allowing research and creative sessions', () => {
    const prompt = nativeHandoffPrompt('abcdefghijklmnop', false);
    expect(prompt).toContain('a different agent can continue');
    expect(prompt).not.toContain('a different coding agent can continue');
    expect(prompt).toContain('coding, research, analysis, creative work');
    expect(prompt).toContain('Do not invent repository, implementation, test, file, or release state');
    expect(prompt).toContain('Tool-detail setting');
    expect(prompt).toContain('[[CLF-HANDOFF:abcdefghijklmnop]]');
  });
});
