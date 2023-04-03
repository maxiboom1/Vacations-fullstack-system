class UserModel {
    
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;


    public constructor(user: UserModel) {
     
      this.userId = user.userId;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.password = user.password;
      this.roleId = user.roleId;
      
    }

}


export default UserModel;