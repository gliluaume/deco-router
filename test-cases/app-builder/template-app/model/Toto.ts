export class Toto {
    public id: number;
    public name: string;
    constructor(param: Toto) {
        this.id = +param.id;
        this.name = param.name;
    }
}
