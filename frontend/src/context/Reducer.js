
export const authInitialState = {
    user: {
        name:"",
        email:"",   
    },
    error: "",
    isLogged:false
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
              user: {
                name: action.payload.username,
                    email: action.payload.email,
                img: action.payload.img ,
                  isSeller: action.payload.isSeller 
                },
                error: "",
                isLogged:true
            };
        case "LOGIN_FAILURE":
            return {
              user: {
                name: "",
                email: "",
                img: "",
                isSeller: "",
              },
              error: action.payload,
              isLogged: false,
            };
        case "LOGOUT":
            return {
              user: {
                name: "",
                email: "",
                img: "",
                isSeller: "",
              },
              error: "",
              isLogged: false,
            };
        
        default:
            return state;
    }
}