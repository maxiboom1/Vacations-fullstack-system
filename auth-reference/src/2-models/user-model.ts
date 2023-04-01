import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // TODO: Validation...

}

export default UserModel;
