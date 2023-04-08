class AppConfig {

    // App settings:
    public port = 4000;
    public serverUrl = "http://localhost:" + this.port;
    public imagesUrl = this.serverUrl + "/api/img/";

    // Database settings:
    public mySqlHost = "localhost";
    public mySqlUser = "root";
    public mySqlPassword = "";
    public mySqlDatabase = "vacations";

}

const appConfig = new AppConfig();

export default appConfig;
