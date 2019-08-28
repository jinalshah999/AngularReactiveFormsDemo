export class UserModel {
  public constructor(
    public user_name: string,
    public user_email: string,
    public user_password: string,
    public user_phone: number,
    public user_gender: string,
    public user_hobbies: string,
    public user_city: string
  ) {}
}
