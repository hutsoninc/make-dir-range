const isSubsetOf = (subset, set) => {
    for (let i = 0; i < subset.length; i++) {
        if (set.indexOf(subset[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = {
    isSubsetOf
}