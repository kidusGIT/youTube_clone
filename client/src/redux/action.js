
// SHOW MENU
export const showMenu = () => {
    return {
        type:'SHOW_MENU'
    }
}

// HIDE MENU
export const hideMenu = () => {
    return {
        type:'HIDE_MENU'
    }
}

// USER LOGIN
export const userInfo = (user) => {
    return {
        type:'USER_INFO',
        payload:user
    }
}
