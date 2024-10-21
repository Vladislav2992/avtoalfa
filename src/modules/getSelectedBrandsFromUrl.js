export function getSelectedBrandsFromUrl() {
  const url = new URL(window.location);
  const brandsFromUrl = url.searchParams.get("brands");
  return brandsFromUrl ? brandsFromUrl.split(",") : [];
}