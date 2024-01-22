export const load = async (data) => {
  return {
    session: await data.locals.getSession(),
  }
}