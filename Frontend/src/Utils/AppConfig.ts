enum URL {
    REGISTER = 'http://localhost:4000/api/register',
    LOGIN = 'http://localhost:4000/api/login',
    VACATIONS = 'http://localhost:4000/api/vacations/',
    FOLLOW = 'http://localhost:4000/api/follow/',
    SOCKET = 'http://localhost:4001',
  }

class AppConfig {
    
    public registerURL = URL.REGISTER;
    public loginURL = URL.LOGIN;
    public vacationsURL = URL.VACATIONS;
    public followURL = URL.FOLLOW;
    public socketURL = URL.SOCKET;
}

const appConfig = new AppConfig();

export default appConfig;
