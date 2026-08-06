// export const saveAuth = (data) => {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem(
//         "user",
//         JSON.stringify(data.user)
//     );
// };
// export const getToken = () => {
//     return localStorage.getItem("token");
// };
// // export const getUser = () => {
// //     const user = localStorage.getItem("user");
// //     return user ? JSON.parse(user) : null;
// // };
// export const getUser = () => {

//     const user = localStorage.getItem("user");

//     if (
//         !user ||
//         user === "undefined" ||
//         user === "null"
//     ) {
//         return null;
//     }

//     try {
//         return JSON.parse(user);
//     } catch {
//         return null;
//     }

// };
// export const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
// };


export const saveAuth = (data) => {

    localStorage.setItem("token", data.token);

    localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

};

export const getToken = () => {

    return localStorage.getItem("token");

};

export const getUser = () => {

    const user = localStorage.getItem("user");

    if (
        !user ||
        user === "undefined" ||
        user === "null"
    ) {

        return null;

    }

    try {

        return JSON.parse(user);

    }

    catch {

        return null;

    }

};

export const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

};