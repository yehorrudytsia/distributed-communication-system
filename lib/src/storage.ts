interface obj{
    select: (string, any, object) => Promise <any>
    insert : (string, object) => object
}

class Storage3{

    db: obj;
    constructor(db: obj) {

        this.db = db;
    }


    getUser(login : string) : Promise <any> {

        let result : Promise <any> = this.db
        .select('SystemUsers', ['Id', 'Password', 'Fullname'], { login })
        .then(([user]) => user);
        return result;
    }

    getUserId(token : string) : Promise <any> {

        let result : Promise <any> = this.db
       .select('Sessions', ['userId'], {token})
       .then(([userId]) => userId);
        return result;
    }
    registration(login : string, password : string, fullName : string) : Promise <any> {

        let result : any = this.db
        .insert('SystemUsers', { login, password, fullName });
      return result;
    }
    setSession({ userId, token, data }) : any {

        this.db.insert('Sessions', { userId, token, data });
    }
    async getSession(token : any) : Promise <any> {
        let result : Promise <any> = await this.db
      .select('Sessions', ['Data'], { token });
       return result;
    }

}

module.exports = Storage3;
