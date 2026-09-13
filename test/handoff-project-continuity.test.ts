import { describe, expect, it } from 'vitest';
import { HANDOFF_BRIEF_RULES, nativeHandoffPrompt } from '../src/main/session/handoff-prompt.js';
import { resumeBootstrapMatches, resumeBootstrapText } from '../src/main/session/handoff.js';

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

  it('tells the replacement chat to reactivate Project and local continuation context', () => {
    const bootstrap = resumeBootstrapText('HANDOFF BODY', 'abcdefghijklmnop');
    expect(bootstrap).toContain('Continuation Recovery, not Fresh Onboarding');
    expect(bootstrap).toContain('current ChatGPT Project');
    expect(bootstrap).toContain('root AGENTS.md');
    expect(bootstrap).toContain('live Working hypotheses');
    expect(bootstrap).toContain('HANDOFF BODY');
    expect(bootstrap).toContain('[[CLF-RESUME:abcdefghijklmnop]]');
  });

  it('keeps recognizing bootstraps recorded before the recovery wording changed', () => {
    const summary = 'legacy handoff body';
    const legacy =
      'Continuing a Chat On Steroids session that was compacted. This is the brief the previous chat wrote about ' +
      'its own work; carry on from it rather than starting again.\n\n' + summary;
    expect(resumeBootstrapMatches(legacy, summary)).toBe(true);
    expect(resumeBootstrapMatches(resumeBootstrapText(summary), summary)).toBe(true);
  });
});
