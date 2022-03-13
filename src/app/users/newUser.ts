export class NewUser {
    public readonly status: string;

    constructor(
        public name: string,
        public email: string,
        public gender: string
    ) {
        this.status = 'active';
    }
}
