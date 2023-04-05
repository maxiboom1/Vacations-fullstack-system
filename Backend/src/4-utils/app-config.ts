class AppConfig {

    // Server Port:
    public port = 4000;

    public serverUrl = "http://localhost:" + this.port;

    public imagesUrl = this.serverUrl + "/api/img/";


    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "vacations"; // Fill in database name
}

const appConfig = new AppConfig();

export default appConfig;
