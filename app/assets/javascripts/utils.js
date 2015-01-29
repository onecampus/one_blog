Utils = {
  isEmpty: function(obj) {
	  for (pro in obj) {
      if (obj.hasOwnProperty(pro)) {
        return false;
      }
    }
    return true;
	}
}
