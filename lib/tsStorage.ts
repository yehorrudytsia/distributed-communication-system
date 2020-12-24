class Storage2{

    db: any;
    constructor(db: any) {
 
        this.db = db;
    }


    getUser(login : any) : any {
      
        let result : any = this.db
        .select('SystemUsers', ['Id', 'Password', 'Fullname'], { login })
        .then(([user]) => user);
        return result;
    }

    getUserId(token : any) : any {

        let result : any = this.db
       .select('Sessions', ['userId'], {token})
       .then(([userId]) => userId);
        return result;
    }
    registration(login : string, password : string, fullName : string) : any {

        let result : any = this.db
        .insert('SystemUsers', { login, password, fullName });
      return result;
    }
    setSession({ userId, token, data }) : any {

        this.db.insert('Sessions', { userId, token, data });
    }
    getSession() : any {

        return {}
    }

}