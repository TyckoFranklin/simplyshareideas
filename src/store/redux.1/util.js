export const combineMaps = (map1, map2) => {
    let returnMap = new Map();
    for(let [key, value] of map1){
        returnMap.set(key, value);
    }
    for(let [key, value] of map2){
        returnMap.set(key, value);
    }
    return returnMap;
}