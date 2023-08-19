var idl = new Array();

exports.search = (id) => {
    for (var i=0; i<idl.length; i++) {
        if (idl[i] === id) {
            return i;
        }
    }
    return null;
}

exports.get = (id) => {
    return idl[id];
}

exports.getAll = (id) => {
    return idl;
}

exports.add_id = (id) => { 
    if (this.search(id) == null) {
        idl.push(id);
    }    
}
    
exports.remove_id = (id) => { 
    if (idl.length === 0) return;

    for (var i=0; i<idl.length; i++){
        if (idl[i] === id) {
            let a = idl[i];
            idl[i] = idl[idl.length-1]
            idl[idl.length-1] = a;
            break;
        }
    }
    idl.pop();
}





