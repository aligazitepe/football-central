export const CHANGE_THEME = "CHANGE_THEME";

export function changeTheme(value) {
  return {
    type: CHANGE_THEME,
    payload: value
  }
}