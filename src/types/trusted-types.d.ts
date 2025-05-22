// Type definitions for Trusted Types
declare global {
  interface Window {
    trustedTypes?: {
      createPolicy(
        policyName: string,
        policyOptions: {
          createHTML?: (input: string) => string;
          createScript?: (input: string) => string;
          createScriptURL?: (input: string) => string;
        }
      ):
        | {
            createHTML: (input: string) => string;
            createScript: (input: string) => string;
            createScriptURL: (input: string) => string;
          }
        | undefined;
    };
  }
}

export {};
