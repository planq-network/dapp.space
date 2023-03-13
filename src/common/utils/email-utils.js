export const emailValidation = email => {
  return new RegExp(/[\w-]+@([\w-]+\.)+[\w-]+/gm).test(email)
}
