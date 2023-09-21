export const convertErrorCode = (errCode: any) => {
    return errCode && errCode <= 500 ? errCode : 500
}

export const generateEmailToken = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
}