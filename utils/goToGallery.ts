export function goToGallery(
  redirect: (path: string, options: { error: string }) => void,
) {
  redirect('/dub', { error: 'true' });
}
