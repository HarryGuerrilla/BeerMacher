export const SHOW_IMPORT_DIALOG = 'SHOW_IMPORT_DIALOG';
export const CLOSE_IMPORT_DIALOG = 'CLOSE_IMPORT_DIALOG';

export function openRecipeImport() {
  return {
    type: SHOW_IMPORT_DIALOG,
    payload: true,
  };
}

export function closeRecipeImport() {
  return {
    type: CLOSE_IMPORT_DIALOG,
    payload: false,
  };
}
