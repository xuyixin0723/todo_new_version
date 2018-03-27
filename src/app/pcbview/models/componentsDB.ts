import { DBSchema } from '@ngrx/db';
export interface Components {
    id: number;
    X: number;
    Y: number;
    W: number;
    H: number;
}

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
    version: 1,
    name: 'pcbview_components',
    stores: {
      components: {
        autoIncrement: true,
        primaryKey: 'id'
      }
    },
};
