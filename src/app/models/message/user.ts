export class user {

  public username: String;
  public name: String;
  public sender: String;
  public datetimesend: Date;
  public reciever: String;
  public message: String;
  public isread: Boolean;



  public static TrueCopy(user1: user): user {
    return user1 == null ? null : Object.assign(new user(), user1);
  }
}
