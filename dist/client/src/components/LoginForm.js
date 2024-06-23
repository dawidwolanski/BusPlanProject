"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)();
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    const [user, setUser] = (0, react_1.useState)(null);
    const [loginError, setLoginError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('/userapi/status', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const result = await response.json();
                    setIsLoggedIn(result.loggedIn);
                    setUser(result.user || null);
                }
                else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }
            catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };
        checkLoginStatus();
    }, []);
    const onSubmit = async (data) => {
        try {
            const response = await fetch('/userapi/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                setLoginError(errorMessage);
                throw new Error(errorMessage);
            }
            const result = await response.json();
            setIsLoggedIn(true);
            setUser(result.user);
            setLoginError(null);
        }
        catch (error) {
            console.error('Login error:', error);
        }
    };
    const handleLogout = async () => {
        try {
            const response = await fetch('/userapi/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setIsLoggedIn(false);
                setUser(null);
            }
        }
        catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (<div className="container mt-5">
      {isLoggedIn ? (<div>
          <h2>Zalogowano jako: {user?.username}</h2>
          <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
        </div>) : (<div>
          <h2>Login trzeba dodac jakies f5 albo redirect po zalogowaniu</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="login" className="form-label">Login</label>
              <input type="text" className="form-control" id="login" {...register('login', { required: 'Login is required' })}/>
              {errors.login && <p className="text-danger">{errors.login.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" {...register('password', { required: 'Password is required' })}/>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
            {loginError && <p className="text-danger mt-3">{loginError}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>)}
    </div>);
};
exports.default = LoginForm;
//# sourceMappingURL=LoginForm.js.map