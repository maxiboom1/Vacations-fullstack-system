class UserModel {
    
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
    roleId: number;


    public constructor(user: UserModel) {
     
      this.userId = user.userId;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.hashedPassword = user.hashedPassword;
      this.roleId = user.roleId;
      
    }

}


export default UserModel;