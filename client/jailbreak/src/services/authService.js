const API_URL = "http://localhost:8080";


// function makeUser(body) {
//     const sections = body.jwt.split(".");
//     //const json = atob(sections[1]); -- this was yelling at me because atob is old and suggested using the following. May change if problems arise.
//     const json = Buffer.from(sections[1], 'base64');
//     const user = JSON.parse(json);
//     localStorage.setItem("jwt", body.jwt);
//     return user;
// }

export async function authenticate(user) {

    const credentials =
    {
        username: user.username,
        password: user.password
    };

    const init = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      };
    
      const response = await fetch(`${API_URL}/authenticate`, init);
      if (response.status === 200) {
        const json = await response.json();
        setToken(json.jwt_token);
        return makeUser(json.jwt_token);
      } else if (response.status === 403) {
        return ['Bad credentials'];
      } else {
        return Promise.reject(['Something unexpected happened!']);
      }
}

export const refresh = async () => {

    const token = getToken();
    if (!token) {
      return Promise.reject("Forbidden!")
    }
  
    const init = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    const response = await fetch(`${API_URL}/refresh_token`, init);
    if (response.status === 200) {
      const json = await response.json();
      setToken(json.jwt_token);
      return makeUser(json.jwt_token);
    } else if (response.status === 403) {
      return ['Bad credentials'];
    } else {
      return Promise.reject(['Something unexpected happened!']);
    }
}

export async function create_account(user){
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(`${API_URL}/create_account`, init);
    if (response.ok) {
        const body = await response.json();
        return makeUser(body);
    } else {
        return response.json();
    }
}

const makeUser = (jwtToken) => {
    const decodedToken = decodeToken(jwtToken);
    const userInfo = JSON.parse(decodedToken);
  
    return { userId: userInfo.user_id,
      username: userInfo.sub,
      roles: "USER"
    };
  };

export const logout = () => {
    localStorage.removeItem('jwt');
  };

const decodeToken = (jwtToken) => {
    const tokenParts = jwtToken.split('.');
    if (tokenParts.length === 3) {
      return atob(tokenParts[1]);
    }
    console.error('Invalid token');
};

const setToken = (jwtToken) => {
    localStorage.setItem('jwt', jwtToken);
};

const getToken = () => {
    return localStorage.getItem('jwt');
}