export class Random {
  /**
   *
   * @param length
   * @returns Random number of given length
   */
  public static numeric(length = 6): string {
    const chars = '0123456789';
    let token = '';

    let i = 0;
    while (i < length) {
      token += chars[Math.round(Math.random() * (chars.length - 1))];

      i += 1;
    }

    return token;
  }
}
