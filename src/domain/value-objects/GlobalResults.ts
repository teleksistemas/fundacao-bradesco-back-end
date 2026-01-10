
export class GlobalResults {
    constructor(
        public readonly success: boolean,
        public readonly message: string,
        public readonly data: any | null,
        public readonly error?: string
    ) { }
}