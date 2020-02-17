declare module 'jsencrypt' {
    export class JSEncrypt {
      constructor();
      setPublicKey(pk: string): void;
      setPrivateKey(pk: string): void;
      encrypt(key: string): string;
      decrypt(key: string): string;
    }
  }