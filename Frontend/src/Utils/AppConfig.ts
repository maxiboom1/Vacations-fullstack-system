class AppConfig {
    
    public registerURL = "http://localhost:4000/api/register";
    public loginURL = "http://localhost:4000/api/login";
    public vacationsURL = "http://localhost:4000/api/vacations/";
    public followURL = "http://localhost:4000/api/follow/";
    public socketURL = "http://localhost:4001";
}

const appConfig = new AppConfig();

export default appConfig;
