class AppConfig {

    // Server Port:
    public port = 4000;

    // Server url: 
    public serverUrl = "http://localhost:" + this.port;

    // Images url:
    public imagesUrl = this.serverUrl + "/api/products/images/";

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "northwind";
}

const appConfig = new AppConfig();

export default appConfig;
