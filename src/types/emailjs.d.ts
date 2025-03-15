
interface EmailJSResponseStatus {
  status: number;
  text: string;
}

interface EmailJS {
  init(publicKey: string): void;
  send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, unknown>,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;
}

declare global {
  interface Window {
    emailjs: EmailJS;
  }
}

export {};
