export const currency: string = "MATIC"

export const loaderSize = 25

export const getNotificationErrorMessage = (message?: string) => message ?? "Something went wrong! 😭"

export const getAvatarURL = (address: string) => `https://avatars.dicebear.com/api/open-peeps/${address ?? "placeholder"}.svg`
