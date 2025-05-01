import { ABSPattern, IPattern } from '../../../interfaces';

class EmailPattern implements IPattern {
  private static instance: EmailPattern;

  private constructor() {}

  public static getInstance(): EmailPattern {
    if (!EmailPattern.instance) {
      EmailPattern.instance = new EmailPattern();
    }
    return EmailPattern.instance;
  }

  public mask(text: string): string {
    const emailRegex =
      /([a-zA-Z0-9._%+-]{1,64})@([a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,})/g;

    return text.replace(emailRegex, (match, local, domain) => {
      const domainParts = domain.split('.');
      const extension = domainParts.pop()!; // último elemento es extensión
      const domainBody = domainParts.join('.');
      const domainReal = domainParts[0];
      // ---- LOCAL ----
      let maskedLocal = '*';
      if (local.length >= 3) {
        const firstTwo = local.slice(0, 2);
        const last = local.slice(-1);
        maskedLocal = `${firstTwo}${'*'.repeat(local.length - 3)}${last}`;
      }

      // ---- DOMINIO ----
      let maskedDomain: string;
      if (domainReal.length >= 2) {
        const first = domainBody[0];
        maskedDomain = `${first}${'*'.repeat(domainBody.length - 1)}`;
      } else {
        maskedDomain = '*'.repeat(domainBody.length);
      }

      return `${maskedLocal}@${maskedDomain}.${extension}`;
    });
  }
}

export class EmailPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return EmailPattern.getInstance();
  }
}
