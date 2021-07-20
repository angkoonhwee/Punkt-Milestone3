export const saveUser = state => {
    try {
        const serialisedState = JSON.stringify(state);
        //console.log(serialisedState);
        localStorage.setItem("user", serialisedState);
    } catch (err) {
        console.log(err);
    }
};

export const loadUser = () => {
    try {
        const serialisedState = localStorage.getItem("user");
        //console.log(serialisedState);
        if(serialisedState === null) {
            return null;
        }
        return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        console.log(error);
        return null;
    }
}

