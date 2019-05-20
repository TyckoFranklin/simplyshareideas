
export const sortMapByProperty = (map, property) => {
    let a = new Map();
    console.log(map);
    return new Map([...map.entries()].sort((a, b)=>{
        if(a[1][property] < b[1][property]){
            return -1;
        }
        if(a[1][property] > b[1][property]){
            return 1;
        }
        return 0;
    }));
}
export const sortObjectArrayByProperty = (objArray, property) => {
    return objArray.sort((a, b)=>{
        if(a[property] < b[property]){
            return -1;
        }
        if(a[property] > b[property]){
            return 1;
        }
        return 0;
    });
}