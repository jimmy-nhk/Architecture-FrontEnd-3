export class TokenStorageService{

    private TOKEN_KEY = 'auth-token';
    private USER_KEY = 'auth-user';

    constructor(){}

    signOut(): void{
        window.sessionStorage.clear()
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.setItem(this.TOKEN_KEY, token);
    }
     
    public getToken() {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }
    
    public saveUser(user: any): void {
        window.sessionStorage.removeItem(this.USER_KEY);
        window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    
    public getUser(): any {
        return JSON.parse(sessionStorage.getItem(this.USER_KEY)||'{}');
    }
}