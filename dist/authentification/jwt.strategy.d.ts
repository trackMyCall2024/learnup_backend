declare const JwtStrategy_base: new (...args: any) => InstanceType<any> & {
    validate(...args: any[]): unknown | Promise<unknown>;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
