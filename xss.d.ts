declare module "xss-clean" {
  interface XssOptions {
    // Define the options interface based on the options accepted by xss-clean
    // For example:
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
  }

  function xss(options?: XssOptions): (req, res, next) => void;

  export = xss;
}
