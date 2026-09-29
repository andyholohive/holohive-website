import type { InquiryIntent } from './qualification';

const marker = '__hhInquiryEntry';
export const inquiryIntentFromHash = (hash: string): InquiryIntent | null =>
  hash === '#request-scan'
    ? 'scan'
    : hash === '#contact'
      ? 'conversation'
      : null;

/** Own only entries created here; never guess whether Back would leave the site. */
export function createInquiryNavigation(
  browser: Pick<
    Window,
    'location' | 'history' | 'addEventListener' | 'removeEventListener'
  >,
  onChange: (intent: InquiryIntent | null) => void,
  token: string,
) {
  let closing = false;
  const sync = () => {
    closing = false;
    onChange(inquiryIntentFromHash(browser.location.hash));
  };
  browser.addEventListener('hashchange', sync);
  browser.addEventListener('popstate', sync);
  sync();
  return {
    open(intent: InquiryIntent) {
      closing = false;
      const hash = intent === 'scan' ? '#request-scan' : '#contact';
      if (browser.location.hash !== hash) {
        const alreadyOpen = inquiryIntentFromHash(browser.location.hash);
        const state = { ...browser.history.state };
        if (!alreadyOpen) state[marker] = token;
        const url = browser.location.pathname + browser.location.search + hash;
        // Changing inquiry type should not add another dialog to the Back stack.
        if (alreadyOpen) browser.history.replaceState(state, '', url);
        else browser.history.pushState(state, '', url);
      }
      sync();
    },
    close() {
      if (closing) return;
      onChange(null);
      if (!inquiryIntentFromHash(browser.location.hash)) return;
      if (browser.history.state?.[marker] === token) {
        closing = true;
        browser.history.back();
      } else {
        const state = { ...browser.history.state };
        delete state[marker];
        browser.history.replaceState(
          state,
          '',
          browser.location.pathname + browser.location.search + '#top',
        );
      }
    },
    dispose() {
      browser.removeEventListener('hashchange', sync);
      browser.removeEventListener('popstate', sync);
    },
  };
}
