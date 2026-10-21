import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * Variable which is used to store the secret key to encrypt and decrypt.
   */
  secretKey: string = '12345';

  /**
   * Method which is used to encrypt the data.
   */
  encryptData(data: any) {
    const ciphertext = CryptoJS.AES.encrypt(String(data), this.secretKey).toString();
    return encodeURIComponent(ciphertext);
  }

  /**
   * Method which is used to decrypt the data.
   */
  decrptyData(data: any) {
    const decodeCipherText = decodeURIComponent(data);
    const bytes = CryptoJS.AES.decrypt(decodeCipherText, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}
