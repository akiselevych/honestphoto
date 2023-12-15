export const tokenSetters = (access: string, refresh: string) => {
    const dateForAccess = new Date();
    dateForAccess.setHours(dateForAccess.getHours() + 12);
    const dateForRefresh = new Date();
    dateForRefresh.setHours(dateForRefresh.getHours() + 60);

    const accessToken = {
        token: access,
        exp: dateForAccess
    }
    const refreshToken = {
        token: refresh,
        exp: dateForRefresh
    }
    localStorage.setItem("accessHonestPhoto", JSON.stringify(accessToken));
    localStorage.setItem("refreshHonestPhoto", JSON.stringify(refreshToken));
}