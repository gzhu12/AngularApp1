export class User{
    id:  string;
     company: string;
    public last_name: string;
    public first_name: string;

    constructor(id:  string, first_name: string, last_name: string, company:string) {
        this.id = id;
        this.company = company;
        this.first_name = first_name;
        this.last_name = last_name;
}
}