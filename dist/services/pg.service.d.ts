export interface QueryOptionsInterface {
    dbConnStr?: string;
    querySQL: string;
    queryArgs?: Array<any>;
}
export declare class PgService {
    private pool;
    constructor();
    query(options: QueryOptionsInterface): Promise<{}>;
}
