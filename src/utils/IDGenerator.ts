import moment from 'moment';

import { Random } from './random.utils';

export class IDGenerator {
  /**
   * Generate new Id with object type prefix
   * For e.g usr for user entity, avl for availability entity
   *
   * @param prefix
   * @returns
   */
  public static new(prefix = 'obj'): string {
    const now = moment();

    const date = now.format('YYYYMMDDHHmmss');

    const random = Random.numeric(4);

    return `${prefix}_${date}${random}`;
  }
}
