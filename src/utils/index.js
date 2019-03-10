/**
 *
 * @param {ISearchResult} result
 */
export function deepestSearchResult(result) {
    if (result.place) {
        return result.place;
    } else {
        if (result.location) {
            return result.location;
        } else {
            return result.building;
        }
    }
}
