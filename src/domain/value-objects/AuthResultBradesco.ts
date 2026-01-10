
export class AuthResultBradesco {
    constructor(
        public readonly success: boolean,
        public readonly data: Data | {},
        public readonly error?: string
    ) { }
}

interface Data {
    "token_type"?: string;
    "expires_in"?: number;
    "ext_expires_in?": number;
    "access_token"?: string;
    "error"?:string;
    "error_description"?:string;
    "error_codes"?:number[];
    "timestamp"?:string;
    "trace_id"?:string;
    "correlation_id"?:string;
}